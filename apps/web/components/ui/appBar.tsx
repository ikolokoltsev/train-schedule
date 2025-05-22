import Link from "next/link";
import AuthButton from "../authButton";

const AppBar = () => {
  return (
    <div className="p-2 shadow flex gap-4 bg-gradient-to-br from-blue-400 to-slate-400 text-white">
      <Link href={"/"}>Home</Link>
      <Link href={"/schedule"}>Schedule</Link>
      <AuthButton />
    </div>
  );
};

export default AppBar;
