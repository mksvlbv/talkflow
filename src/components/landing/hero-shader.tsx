"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    vec2 q = vec2(0.0);
    q.x = fbm(st + 0.00 * u_time);
    q.y = fbm(st + vec2(1.0));

    vec2 r = vec2(0.0);
    r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.05 * u_time);
    r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.026 * u_time);

    float f = fbm(st + r);

    // Warm orange/amber palette (accent: #F0551E)
    vec3 colorDark  = vec3(0.12, 0.06, 0.04);  // deep warm dark
    vec3 colorMid   = vec3(0.50, 0.22, 0.08);  // warm copper/amber
    vec3 colorLight = vec3(0.94, 0.52, 0.18);  // bright orange highlight

    vec3 color = mix(colorDark, colorMid, clamp((f * f) * 4.0, 0.0, 1.0));
    color = mix(color, colorLight, clamp(length(q), 0.0, 1.0));
    color = mix(color, colorDark, clamp(length(r.x), 0.0, 1.0));

    // Silk-like ridge highlights
    float ridge = abs(fbm(st * 2.0 + u_time * 0.1) - 0.5) * 2.0;
    color += colorLight * pow(1.0 - ridge, 4.0) * 0.15;

    gl_FragColor = vec4((f * f * f + 0.6 * f * f + 0.5 * f) * color, 1.0);
}
`;

export function HeroShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false });
    if (!gl) return;

    function createShader(g: WebGLRenderingContext, type: number, source: string) {
      const shader = g.createShader(type)!;
      g.shaderSource(shader, source);
      g.compileShader(shader);
      if (!g.getShaderParameter(shader, g.COMPILE_STATUS)) {
        g.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const posAttr = gl.getAttribLocation(program, "a_position");
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resLoc = gl.getUniformLocation(program, "u_resolution");

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 1);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    }

    resize();
    window.addEventListener("resize", resize);

    let start = performance.now();
    function render() {
      if (!gl || !canvas || !visibleRef.current) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);
      gl.enableVertexAttribArray(posAttr);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1f(timeLoc, (performance.now() - start) / 1000);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) render();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);
    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ display: "block", zIndex: 0, pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
