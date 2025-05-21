"use client";
import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./button";

const LoadingButton = ({ children }: PropsWithChildren) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} className="w-full mt-4">
      {pending ? "Loading..." : children}
    </Button>
  );
};

export default LoadingButton;
