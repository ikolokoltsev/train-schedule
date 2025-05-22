"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/ui/loadingButton";
import { signIn } from "@/lib/auth";
import Link from "next/link";
import { useActionState } from "react";

const SignInForm = () => {
  const [state, action] = useActionState(signIn, undefined);
  return (
    <form action={action}>
      <div className="flex flex-col gap-2 w-64">
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="my@email.com"
            type="email"
          />
        </div>
        {state?.error?.email && (
          <p className="text-sm text-red-500">{state?.error.email}</p>
        )}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
        </div>
        {state?.error?.password && (
          <div className="text-sm text-red-500">
            <p>Password must:</p>
            <ul>
              {state.error.password.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <Link className="text-sm underline text-center" href="#">
          Forgot your password?
        </Link>
        <LoadingButton>Sign In</LoadingButton>
      </div>
    </form>
  );
};

export default SignInForm;
