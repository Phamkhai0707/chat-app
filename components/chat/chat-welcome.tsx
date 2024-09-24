import { Hash } from "lucide-react";
import "@/languages/i18n"
import { useTranslation } from "react-i18next";

interface ChatWelcomeProps {
    name: string;
    type: "channel" | "conversation";
}

export const ChatWelcome = ({
    name,
    type
}: ChatWelcomeProps) => {
    const { t } = useTranslation();

    return (
        <div className="space-y-2 px-4 mb-4">
            {type === "channel" && (
                <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
                    <Hash className="h-12 w-12 text-white" />
                </div>
            )}
            <p className="text-xl md:text-3xl font-bold">
                {type === "channel" ? t("chatWelcome") : ""}<span className="text-indigo-500">{name}</span>
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                {type === "channel"
                    ? `${t("channelWelcomePart1")}${name}${t("channelWelcomePart2")}`
                    : `${t("conversationWelcome")}${name}`
                }
            </p>
        </div>
    )
}