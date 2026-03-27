import Link from "next/link";

import { SignUp } from "@clerk/nextjs";

type SignUpPageProps = {
  searchParams: Promise<{
    redirect_url?: string;
  }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { redirect_url } = await searchParams;
  const redirectUrl = redirect_url ?? "/pricing";

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[36px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,251,245,0.95),rgba(244,232,222,0.88))] p-8 shadow-[0_30px_80px_-40px_rgba(38,25,18,0.4)]">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Create account
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            Register, pay in Stripe sandbox, and enter the studio.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">
            Clerk handles the sign-up state so the paid platform can stay behind authenticated access and subscription checks.
          </p>
          <div className="mt-8 space-y-4 text-sm text-muted-foreground">
            <p>This account is also used to associate Prisma records and Stripe customer metadata.</p>
            <p>
              Already have access?{" "}
              <Link
                href={`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Sign in instead
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center rounded-[36px] border border-white/60 bg-white/80 p-4 shadow-[0_30px_80px_-40px_rgba(38,25,18,0.4)] backdrop-blur">
          <SignUp
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
            forceRedirectUrl={redirectUrl}
            fallbackRedirectUrl="/pricing"
          />
        </section>
      </div>
    </main>
  );
}
