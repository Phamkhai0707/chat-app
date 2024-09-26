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
    topic: string;
    type: "channel" | "conversation";
    imageUrl?: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
}

export const ChatHeader = ({
    serverId,
    topic,
    name,
    imageUrl,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
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
                    {name !== "general" && topic && (
                        <>
                            <div className="bg-zinc-200 dark:bg-zinc-700 w-0.5 h-8 mx-2 hidden md:block"/>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm hidden md:block">
                                {topic}
                            </p>
                        </>
                    )}
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
                <ChatPinned 
                    member={member}
                    chatId={chatId}
                    apiUrl={apiUrl}
                    socketUrl={socketUrl}
                    socketQuery={socketQuery}
                    paramKey={paramKey}
                    paramValue={paramValue}
                />
                <SocketIndicator/>
            </div>
        </div>
    )
}