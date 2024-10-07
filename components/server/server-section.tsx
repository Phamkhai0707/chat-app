"use client"

import { ServerWithMembersWithProfiles } from "@/type";
import { ChannelType, MemberRole } from "@prisma/client";
import { ActionTooltip } from "@/components/action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import "@/languages/i18n"
import { useTranslation } from "react-i18next";

interface ServerSectionProps {
    label: string;
    role?: MemberRole;
    sectionType: "channels" | "members";
    channelType?: ChannelType;
    server?: ServerWithMembersWithProfiles;
};

export const ServerSection = ({
    label,
    role,
    sectionType,
    channelType,
    server,
}: ServerSectionProps) => {
    const { onOpen } = useModal();
    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-between py-2">
            {label === "Text-Channels" && (
                <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                    {t("searchTextChannelsLabel")}
                </p>
            )}
            {label === "Voice-Channels" && (
                <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                    {t("searchAudioChannelsLabel")}
                </p>
            )}
            {label === "Video-Channels" && (
                <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                    {t("searchVideoChannelsLabel")}
                </p>
            )}
            {label === "Members" && (
                <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                    {t("searchMembersLabel")}
                </p>
            )}
            {role !== MemberRole.GUEST && sectionType === "channels" && (
                <ActionTooltip label={t("createChannel")} side="top">
                    <button 
                        onClick={() => onOpen("createChannel", { channelType })}
                        className="text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                    >
                        <Plus className="h-4 w-4"/>
                    </button>
                </ActionTooltip>
            )}
            {role === MemberRole.ADMIN && sectionType === "members" && (
                <ActionTooltip label={t("manageMembers")} side="top">
                    <button 
                        onClick={() => onOpen("members", { server })}
                        className="text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                    >
                        <Settings className="h-4 w-4"/>
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
}