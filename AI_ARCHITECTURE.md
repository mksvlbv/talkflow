# AI Architecture & Development Log

## Overview
This document outlines the AI orchestration methodology, prompt engineering strategies, and system workflows used to build **TalkFlow** — a voice-to-content engine.

## Development Methodology
TalkFlow was developed using an "AI-First" engineering approach with **Claude 3.5 Sonnet / Llama 3.3** orchestrating the development:
1. **Schema First:** The Prisma database schema and Clerk authentication flow were rigidly defined before any UI generation.
2. **Feature-Sliced Domains:** Separation of concerns into independent domains (e.g., `audio-processing`, `content-generation`, `billing`).
3. **Iterative Scaffolding:** Starting with strict TypeScript interfaces for OpenAI Whisper and Chat completions, followed by Server Actions, and finally building the React components.

## Core System Prompts & Workflows

### 1. Voice Transcription (OpenAI Whisper)
The system leverages OpenAI's Whisper model to convert raw audio blobs into highly accurate text. The prompt constraints ensure punctuation and proper casing, removing filler words naturally during the parsing stage.

### 2. The Content Generation Engine
Used to transform the raw transcript into publish-ready formats.

```text
You are an expert social media copywriter and content strategist. 
Your task is to take the following raw audio transcript and convert it into {content_format}.

Rules:
1. Match the requested tone (e.g., professional, casual, viral).
2. For Twitter threads, split the output into an array of strings, ensuring no tweet exceeds 280 characters.
3. For LinkedIn posts, use appropriate spacing and professional hooks.
4. Output strict JSON matching the provided schema.

Raw Transcript:
{transcript}
```

## Challenges & Architectural Solutions

### Challenge 1: Handling Large Audio Payloads in Server Actions
**Problem:** Next.js Server Actions have payload limits and timeout constraints, causing issues when uploading long audio recordings for Whisper transcription.
**Solution:** Migrated the audio processing flow. Instead of sending base64 strings through Server Actions, audio blobs are uploaded to secure cloud storage, and the server processes the transcription asynchronously via signed URLs, ensuring stability for long recordings.

### Challenge 2: Deterministic Output for Multi-Platform Content
**Problem:** The LLM would often format Twitter threads and LinkedIn posts unpredictably, breaking the UI renderer.
**Solution:** Enforced strict JSON Schema validation (using Zod integration with Vercel AI SDK). The model is forced to output structured arrays (`{ "tweets": ["..."] }`), which the client maps directly to the UI, guaranteeing zero rendering crashes.

## Infrastructure & Resilience
- **Stripe Webhooks:** Fully integrated and verified Stripe webhooks for recurring billing, ensuring robust subscription state sync.
- **Clerk Auth:** Delegated authentication to Clerk for enterprise-grade security.
