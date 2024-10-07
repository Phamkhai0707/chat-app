import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-cover">
    {/* <div className="h-full flex items-center justify-center bg-[url('/assets/background.jpg')] bg-cover"> */}
      <div className="absolute flex flex-row top-10 left-10 gap-x-2 items-center">
        {/* <Image src={require("@/public/assets/logo.png")} alt="logo" width={50} height={50}/> */}
        <span className={cn(
          "text-3xl font-semibold bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-400 to-indigo-500 bg-clip-text text-transparent",
          font.className
        )}>
          Lotos
        </span>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
