import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/app/sidebar";
import { MobileNav } from "@/components/app/mobile-nav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  const cookieStore = await cookies();
  const isPreview = cookieStore.get("preview_mode")?.value === "true";

  if (!userId && !isPreview) redirect("/sign-in");

  return (
    <div className="flex h-screen flex-col overflow-hidden md:flex-row">
      <MobileNav isPreview={!userId && isPreview} />
      <AppSidebar isPreview={!userId && isPreview} />
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</main>
    </div>
  );
}
