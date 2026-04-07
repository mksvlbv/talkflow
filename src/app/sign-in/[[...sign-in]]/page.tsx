import Link from "next/link";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { BrandLogo } from "@/components/brand-logo";

type SignInPageProps = {
  searchParams: Promise<{
    redirect_url?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { redirect_url } = await searchParams;
  const redirectUrl = redirect_url ?? "/dashboard";

  return (
    <main className="relative flex min-h-screen flex-col px-6 py-12">
      <div className="noise-overlay fixed inset-0 z-[100]" />
      <div className="grid-bg fixed inset-0 z-0" />
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <BrandLogo href="/" className="mb-12" />
      </div>
      <div className="relative z-10 mx-auto grid w-full max-w-4xl flex-1 items-center gap-8 lg:grid-cols-[1fr_1fr]">
        <section className="flex flex-col justify-center">
          <p className="sys-label mb-4">Authentication</p>
          <h1 className="text-3xl font-light leading-tight tracking-tight sm:text-4xl">
            Sign in to your
            <br />
            <span className="text-primary">pipeline.</span>
          </h1>
          <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-text-sub">
            Access your dashboard, recordings, and generated content.
            Your voice-to-content workflow awaits.
          </p>
          <p className="mt-6 text-sm text-text-sub">
            No account?{" "}
            <Link
              href={`/sign-up?redirect_url=${encodeURIComponent(redirectUrl)}`}
              className="text-primary transition-colors hover:brightness-110"
            >
              Create one
            </Link>
          </p>
        </section>

        <section className="flex items-center justify-center border border-line bg-panel p-6">
          <SignIn
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            forceRedirectUrl={redirectUrl}
            fallbackRedirectUrl="/dashboard"
            appearance={{ baseTheme: dark }}
          />
        </section>
      </div>
    </main>
  );
}
