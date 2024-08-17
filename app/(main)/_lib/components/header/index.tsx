import Link from "next/link";
import { FilePlus2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/common/theme-toggle";

import HeaderLayout from "./header-layout";
import UserProfile from "./user-profile";

export async function Header() {
  return (
    <HeaderLayout>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <Link href={"/"}>Second Brain</Link>
        </div>
        <div className="flex items-center justify-around">
          <Button asChild variant={"link"} className="">
            <Link href={"/document"} className="text-secondary-foreground">
              My Documents
            </Link>
          </Button>
          <Button asChild variant={"link"} className="hidden md:flex">
            <Link href={"/dashboard/upgrade"} className="text-secondary-foreground">
              Pricing
            </Link>
          </Button>
          <Button asChild variant={"outline"} size={"icon"}>
            <Link href={"/dashboard/upload"}>
              <FilePlus2 className="h-5 w-5 text-accent-foreground" />
            </Link>
          </Button>
          <div className="flex gap-4 pl-6">
            <UserProfile />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
}
