"use client";

import { ReactNode } from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ThemeProvider } from "@common/theme-provider";
import { Toaster } from "@ui/sonner";
import { TooltipProvider } from "@ui/tooltip";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import NextTopLoader from "nextjs-toploader";

import { env } from "@/env";
import QueryProvider from "./QueryProvider";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL as string);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <NextTopLoader color="#15803d" shadow="0 0 10px #15803d,0 0 5px #15803d" />
        <TooltipProvider delayDuration={0}>
          <ClerkProvider publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
              {children}
            </ConvexProviderWithClerk>
          </ClerkProvider>
        </TooltipProvider>
        <Toaster position="bottom-right" richColors duration={3000} toastOptions={{ style: { textAlign: "center" } }} />
      </ThemeProvider>
    </QueryProvider>
  );
}
