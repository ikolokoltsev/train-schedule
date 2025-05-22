import { getSession } from "@/lib/session";
import Link from "next/link";

const AuthButton = async () => {
  const session = await getSession();
  return (
    <div className="flex items-center gap-4 ml-auto">
      {!session || !session.user ? (
        <>
          <Link href={"/auth/signin"}>Sign In</Link>
          <Link href={"/auth/signup"}>Sign Up</Link>
        </>
      ) : (
        <>
          <p>{session.user.name}</p>
          <Link href={"/api/auth/signout"}>Sign Out</Link>
        </>
      )}
    </div>
  );
};

export default AuthButton;
