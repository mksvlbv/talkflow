"use client";

export function VoiceWaveform({ barCount = 11, className }: { barCount?: number; className?: string }) {
  const heights = [20, 40, 70, 100, 60, 30, 80, 50, 90, 40, 20];
  const delays = [-0.9, -0.7, -0.5, -0.3, -0.1, 0.1, 0.3, 0.5, 0.7, 0.9, 1.1];

  return (
    <div className={`flex h-20 items-center justify-center gap-1.5 border border-line bg-[rgba(255,255,255,0.01)] px-6 ${className ?? ""}`}>
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className="w-[3px] rounded-sm bg-primary opacity-80"
          style={{
            height: `${heights[i % heights.length]}%`,
            animation: `wave-bar 1s ease-in-out ${delays[i % delays.length]}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
