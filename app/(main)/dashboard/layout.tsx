import { ClerkLoaded } from "@clerk/nextjs";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return <ClerkLoaded>{children}</ClerkLoaded>;
};

export default DashboardLayout;
