import "server-only";

import { prisma } from "@/lib/prisma";

type UpsertAppUserInput = {
  clerkUserId: string;
  email?: string | null;
  name?: string | null;
  imageUrl?: string | null;
};

export async function upsertAppUser({
  clerkUserId,
  email,
  name,
  imageUrl,
}: UpsertAppUserInput) {
  return prisma.user.upsert({
    where: {
      clerkUserId,
    },
    update: {
      email: email ?? undefined,
      name: name ?? undefined,
      imageUrl: imageUrl ?? undefined,
    },
    create: {
      clerkUserId,
      email: email ?? undefined,
      name: name ?? undefined,
      imageUrl: imageUrl ?? undefined,
    },
    include: {
      subscription: true,
    },
  });
}

export async function getAppUserByClerkId(clerkUserId: string) {
  return prisma.user.findUnique({
    where: {
      clerkUserId,
    },
    include: {
      subscription: true,
    },
  });
}
