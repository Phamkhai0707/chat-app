import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

export default function Home() {
    return (
        <main className="flex h-full flex-col items-center justify-center bg-[url('/assets/Option-2.jpg')] bg-cover bg-center">
            <div className="space-y-6 text-center justify-center items-center">
                <h1 className={cn(
                    "text-8xl font-semibold text-white drop-shadow-md bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-400 to-indigo-500 bg-clip-text text-transparent",
                    font.className,
                )}>
                    Lotos
                </h1>
                <p className={cn("text-white text-lg", font.className)}>
                    A perfect platform to create conversations
                </p>
                <div>
                    <LoginButton>
                        <Button variant="secondary" size="lg" className={cn("font-semibold",font.className,
                )}>
                            Sign in
                        </Button>
                    </LoginButton>
                </div>
            </div>
        </main>
    )
}