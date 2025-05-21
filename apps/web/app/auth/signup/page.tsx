import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="bg-white p-8 roubnded-lg shadow-md w-96 flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold mb-4">Sign Up Page</h1>

      <div className="flex justify-between text-sm">
        <p>Already have an account?</p>
        <Link className="underline" href="/auth/signup">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
