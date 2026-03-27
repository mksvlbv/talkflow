import "server-only";

type ClerkLikeUser = {
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  imageUrl?: string | null;
  primaryEmailAddressId?: string | null;
  emailAddresses?: Array<{
    id: string;
    emailAddress: string;
  }>;
} | null;

export function getPrimaryEmailAddress(user: ClerkLikeUser) {
  if (!user?.emailAddresses?.length) {
    return null;
  }

  const primary =
    user.emailAddresses.find(
      (emailAddress) => emailAddress.id === user.primaryEmailAddressId,
    ) ?? user.emailAddresses[0];

  return primary?.emailAddress ?? null;
}

export function getDisplayName(user: ClerkLikeUser) {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim();

  if (fullName) {
    return fullName;
  }

  return user?.username ?? null;
}
