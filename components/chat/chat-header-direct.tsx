import { Hash } from "lucide-react";
import { MobileToggle } from "@/components/mobile-toggle";
import { UserAvatar } from "@/components/user-avatar";
import { SocketIndicator } from "@/components/socket-indicator";
import { ChatVideoButton } from "./chat-video-button";
import { ChatPinned } from "./chat-pinned";
import { Member, Message, Profile } from "@prisma/client";

interface ChatHeaderProps {
    serverId: string;
    name: string;

    type: "channel" | "conversation";
    imageUrl?: string;
}

export const ChatHeaderDirect = ({
    serverId,
    name,
    imageUrl,
    type,
}: ChatHeaderProps) => {

    return (
        <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
            <MobileToggle serverId={serverId} />
            {type === "channel" && (
                <div className="flex gap-x-2 items-center">
                    <Hash className="2-5 h-5 text-zinc-500 dark:text-zinc-400" />
                    <p className="font-semibold text-md text-black dark:text-white">
                        {name}
                    </p>
                </div>
            )}
            {type === "conversation" && (
                <>
                    <UserAvatar
                        src={imageUrl}
                        classname="h-8 w-8 md:h-8 md:w-8 mr-2"
                    />
                    <p className="font-semibold text-md text-black dark:text-white">
                        {name}
                    </p>
                </>
            )}
            
            <div className="ml-auto flex items-center gap-x-4">
                {type === "conversation" && (
                    <ChatVideoButton />
                )}
                <SocketIndicator/>
            </div>
        </div>
    )
}