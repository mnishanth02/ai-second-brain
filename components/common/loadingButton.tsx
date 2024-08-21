import { FC, MouseEvent } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "../ui/button";

interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText: string;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

const LoadingButton: FC<LoadingButtonProps> = ({ children, isLoading, loadingText, onClick }) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      onClick={(e) => {
        onClick?.(e);
      }}
      className="flex items-center gap-1"
    >
      {isLoading && <Loader2 className="animate-spin" />}
      {isLoading ? loadingText : children}
    </Button>
  );
};

export default LoadingButton;
