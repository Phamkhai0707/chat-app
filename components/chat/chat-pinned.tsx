"use client"

import { ServerWithMembersWithProfiles } from "@/type"
import { Member, MemberRole, Message, Profile } from "@prisma/client"

import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Loader2, Pin, ServerCrash } from "lucide-react";
import { format } from "date-fns";
import "@/languages/i18n"
import { useTranslation } from "react-i18next";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { ElementRef, Fragment, useRef } from "react";
import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { UserAvatar } from "../user-avatar";
import { useParams, useRouter } from "next/navigation";
import { PinnedMessageItem } from "./pinned-message-item";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile
    }
}

interface ServerHeaderProps {
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
};

export const ChatPinned = ({
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
}: ServerHeaderProps) => {
    const queryKey = `chat:${chatId}`;
    const { t } = useTranslation();

    const chatRef = useRef<ElementRef<"div">>(null);
    const bottomRef = useRef<ElementRef<"div">>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue,
    });
    useChatScroll({
        chatRef,
        bottomRef,
        loadMore: fetchNextPage,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        count: data?.pages?.[0].items?.length ?? 0,
    })

    const havePinnedMessage = data?.pages?.some((group) => group.items.some((message: MessageWithMemberWithProfile) => message.pinned === true))

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="focus:outline-none"
                asChild
            >
                <button>
                    <Pin className="h-7 w-7 rotate-45 text-zinc-500 fill-zinc-300 stroke-zinc-300 hover:fill-zinc-100 hover:stroke-zinc-100 dark:hover:fill-zinc-100 dark:hover:stroke-zinc-100 transition"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-100 border-zinc-700 text-black bg-zinc-800 dark:text-neutral-400 space-y-[2px] items-center"
            >
                <DropdownMenuLabel className="flex flex-row gap-x-2 items-center py-2">
                    <Pin className="ml-2 w-6 h-6 fill-zinc-200 stroke-zinc-200 rotate-45"/>
                    <p className="font-semibold text-lg text-white">{t("pinnedMessagesLabel")}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-700 h-0.5"/>
                {havePinnedMessage ? 
                data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group.items.map((message: MessageWithMemberWithProfile) => (
                            <PinnedMessageItem
                                key={message.id}
                                id={message.id}
                                currentMember={member}
                                member={message.member}
                                content={message.content}
                                fileUrl={message.fileUrl}
                                deleted={message.deleted}
                                pinned={message.pinned}
                                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                isUpdated={message.updatedAt !== message.createdAt}
                                socketUrl={socketUrl}
                                socketQuery={socketQuery}
                            />
                        ))}
                    </Fragment>
                )) : (
                    <div className="flex flex-col items-center justify-center gap-y-3 pt-5 pb-8 px-12">
                        <Image src={require("@/public/assets/unpin.png")} alt="logo" width={100} height={100}/>
                        <p className="text-center">
                            {t("emptyPinnedMessageNoticePart1")}<br/>{t("emptyPinnedMessageNoticePart2")}
                        </p>
                    </div>
                )}                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}