# Voice MVP

Voice-to-text web app built with Next.js, Clerk, OpenAI, Supabase, Prisma, Stripe, and shadcn/ui.

## Overview

The application provides a simple gated transcription flow:

- Visitors can create one free voice transcription.
- Additional usage requires authentication.
- Paid users unlock a private studio workspace.
- Subscriber transcripts are stored in Postgres via Prisma and can upload raw audio to Supabase Storage.

## Features

- Voice recording in the browser
- OpenAI speech-to-text transcription
- One free transcription for guests
- Clerk sign-in and sign-up flow
- Stripe subscription checkout
- Private paid studio for subscribers
- Transcript persistence with Prisma + Supabase Postgres
- Optional audio upload to Supabase Storage

## Tech Stack

- Next.js 16 App Router
- React 19
- Clerk
- OpenAI API
- Prisma 7
- Supabase
- Stripe
- shadcn/ui

## Routes

- `/` public landing page with the free transcription flow
- `/pricing` subscription page
- `/billing/success` post-checkout handoff
- `/studio` private subscriber workspace
- `/sign-in`
- `/sign-up`
- `/api/transcribe`
- `/api/stripe/checkout`
- `/api/stripe/portal`
- `/api/stripe/webhook`

## Environment Variables

Copy `.env.example` to `.env` and fill in the required values.

Required services:

- Clerk
- OpenAI
- Supabase
- Stripe

Notes:

- `DATABASE_URL` should point to your Supabase Postgres database.
- If the direct Supabase host does not resolve locally, use the Supabase `Session pooler` URI instead.
- `STRIPE_PRICE_ID` must point to a recurring Stripe price.
- `SUPABASE_STORAGE_BUCKET` should match your storage bucket name if audio uploads are enabled.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Generate the Prisma client:

```bash
npm run db:generate
```

3. Push the schema to the database:

```bash
npm run db:push
```

4. Start development mode:

```bash
npm run dev
```

5. In a second terminal, forward Stripe webhooks:

```bash
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

## Stable Local Run

If `npm run dev` is noisy on Windows because of a Next.js 16 Turbopack issue, use:

```bash
npm run build
npm run start
```

## Available Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run db:generate`
- `npm run db:push`
- `npm run promptfoo:eval`

## Prisma

Prisma 7 is configured through `prisma.config.ts`, and the active schema file is `prisma-v7-schema.prisma`.

## Deployment

Recommended target: Vercel.

Before deploying:

- add all environment variables to the hosting platform
- configure the Stripe webhook endpoint
- update `NEXT_PUBLIC_APP_URL` to the production domain
- run `prisma db push` against the production database

## Verification

The project has been verified with:

- `npm run db:generate`
- `npm run db:push`
- `npm run lint`
- `npm run build`
