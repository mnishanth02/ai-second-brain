"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PlaceholderDocumentProps {}

const PlaceholderDocument: FC<PlaceholderDocumentProps> = ({}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/dashboard/files/upload");
  };
  return (
    <Button
      onClick={handleClick}
      variant={"outline"}
      className="flex h-80 w-64 flex-col items-center rounded-xl drop-shadow-md"
    >
      <PlusCircleIcon className="h-16 w-16" />
      Add a document
    </Button>
  );
};

export default PlaceholderDocument;
