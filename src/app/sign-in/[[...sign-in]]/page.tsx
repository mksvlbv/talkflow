import Link from "next/link";

import { SignIn } from "@clerk/nextjs";

type SignInPageProps = {
  searchParams: Promise<{
    redirect_url?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { redirect_url } = await searchParams;
  const redirectUrl = redirect_url ?? "/studio";

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[36px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,251,245,0.95),rgba(244,232,222,0.88))] p-8 shadow-[0_30px_80px_-40px_rgba(38,25,18,0.4)]">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Clerk auth
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            Sign in to unlock the next recording.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">
            The brief asks for a free first take, then authentication, then the Stripe subscription. This page is the middle step of that funnel.
          </p>
          <div className="mt-8 space-y-4 text-sm text-muted-foreground">
            <p>After sign-in you land on pricing, subscribe in Stripe sandbox, and then use the `/studio` workspace.</p>
            <p>
              Need a fresh account?{" "}
              <Link
                href={`/sign-up?redirect_url=${encodeURIComponent(redirectUrl)}`}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Create one here
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center rounded-[36px] border border-white/60 bg-white/80 p-4 shadow-[0_30px_80px_-40px_rgba(38,25,18,0.4)] backdrop-blur">
          <SignIn
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            forceRedirectUrl={redirectUrl}
            fallbackRedirectUrl="/studio"
          />
        </section>
      </div>
    </main>
  );
}
