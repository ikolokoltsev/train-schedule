import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-tr from-zinc-300 to-slate-500 h-screen flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
