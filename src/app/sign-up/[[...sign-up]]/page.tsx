import Link from "next/link";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { BrandLogo } from "@/components/brand-logo";

type SignUpPageProps = {
  searchParams: Promise<{
    redirect_url?: string;
  }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { redirect_url } = await searchParams;
  const redirectUrl = redirect_url ?? "/onboarding";

  return (
    <main className="relative flex min-h-screen flex-col px-6 py-12">
      <div className="noise-overlay fixed inset-0 z-[100]" />
      <div className="grid-bg fixed inset-0 z-0" />
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <BrandLogo href="/" className="mb-12" />
      </div>
      <div className="relative z-10 mx-auto grid w-full max-w-4xl flex-1 items-center gap-8 lg:grid-cols-[1fr_1fr]">
        <section className="flex flex-col justify-center">
          <p className="sys-label mb-4">Get Started</p>
          <h1 className="text-3xl font-light leading-tight tracking-tight sm:text-4xl">
            Create your
            <br />
            <span className="text-primary">account.</span>
          </h1>
          <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-text-sub">
            Start turning your voice into structured, publish-ready content.
            Free tier includes 30 minutes per month.
          </p>
          <p className="mt-6 text-sm text-text-sub">
            Already have an account?{" "}
            <Link
              href={`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`}
              className="text-primary transition-colors hover:brightness-110"
            >
              Sign in
            </Link>
          </p>
        </section>

        <section className="flex items-center justify-center border border-line bg-panel p-6">
          <SignUp
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
            forceRedirectUrl={redirectUrl}
            fallbackRedirectUrl="/onboarding"
            appearance={{ baseTheme: dark }}
          />
        </section>
      </div>
    </main>
  );
}
