"use client";

import { FC } from "react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";

import { Skeleton } from "@/components/ui/skeleton";

interface UserProfileProps {}

const UserProfile: FC<UserProfileProps> = ({}) => {
  return (
    <>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
      <AuthLoading>
        <Skeleton className="h-8 w-8 rounded-full bg-accent" />
      </AuthLoading>
    </>
  );
};

export default UserProfile;
