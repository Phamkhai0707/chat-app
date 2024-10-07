"use client"

import * as z from "zod";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member, MemberRole, Profile } from "@prisma/client";
import { UserAvatar } from "@/components/user-avatar";
import { ActionTooltip } from "@/components/action-tooltip";
import { FileIcon, ShieldAlert, ShieldCheck, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import "@/languages/i18n"
import { useTranslation } from "react-i18next";
import { useModal } from "@/hooks/use-modal-store";

interface PinnedMessageItemProps {
    id: string;
    content: string;
    member: Member & {
        profile: Profile;
    };
    timestamp: string;
    fileUrl: string | null;
    deleted: boolean;
    pinned: boolean;
    currentMember: Member;
    isUpdated: boolean;
    socketUrl: string;
    socketQuery: Record<string, string>; 
};

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    "ADMIN": <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />
}

const formSchema = z.object({
    content: z.string().min(1),
});

export const PinnedMessageItem = ({
    id,
    content,
    member,
    timestamp,
    fileUrl,
    deleted,
    pinned,
    currentMember,
    isUpdated,
    socketUrl,
    socketQuery,
}: PinnedMessageItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const { onOpen } = useModal();
    const router = useRouter();
    const params = useParams();
    const { t } = useTranslation();

    const onMemberClick = () => {
        if(member.id === currentMember.id) {
            return;
        }

        router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: content,
        }
    })

    useEffect(() => {
        const handlekeyDown = (event: any) => {
            if(event.key === "Escape" || event.keyCode === 27) {
                setIsEditing(false);
                form.reset();
            }
        }

        window.addEventListener("keydown", handlekeyDown);

        return () => window.removeEventListener("keyDown", handlekeyDown);
    }, [form]);

    useEffect(() => {
        form.reset({
            content: content,
        })
    }, [content, form]);

    const fileType = fileUrl?.split(".").pop();

    const isPDF = fileType === "pdf" && fileUrl;
    const isImage = !isPDF && fileUrl;

    if(!pinned) {
        return null;
    }
    return (
        <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                <div 
                    onClick={onMemberClick}
                    className="cursor-pointer hover:drop-shadow-md transition"
                >
                    <UserAvatar src={member.profile.imageUrl} />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p
                                onClick={onMemberClick}
                                className="font-semibold text-sm hover:underline cursor-pointer"
                            >
                                {member.profile.name}
                            </p>
                            <ActionTooltip label={member.role}>
                                {roleIconMap[member.role]}
                            </ActionTooltip>
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {timestamp}
                        </span>
                    </div>
                    {isImage && (
                        <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
                        >
                            <Image
                                src={fileUrl}
                                alt={content}
                                fill
                                className="object-cover"
                            />
                        </a>
                    )}
                    {isPDF && (
                        <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                            <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                            <a    
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                            >
                                PDF file
                            </a>
                        </div>
                    )}
                    {!fileUrl && !isEditing && (
                        <p className={cn(
                            "text-sm text-zinc-600 dark:text-zinc-300"
                        )}>
                            {content}
                            {isUpdated && !deleted && (
                                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                                    {t("edittedMessage")}
                                </span>
                            )}
                        </p>
                    )}
                </div>
                <ActionTooltip label={t("pinMessageOff")}>
                    <X
                        onClick={() => onOpen("pinMessage", {
                            onPinned: false,
                            apiUrl: `${socketUrl}/unpin/${id}`,
                            query: socketQuery,
                        })}
                        className="cursor-pointer ml-auto w-5 h-5 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                    />
                </ActionTooltip>
            </div>      
        </div>
    )
}