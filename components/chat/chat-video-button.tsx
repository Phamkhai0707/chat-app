"use client"

import qs from "query-string"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Video, VideoOff } from "lucide-react"
import "@/languages/i18n"

import { ActionTooltip } from "@/components/action-tooltip"
import { useTranslation } from "react-i18next"

export const ChatVideoButton = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { t } = useTranslation();

    const isVideo = searchParams?.get("video");

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname || "",
            query: {
                video: isVideo ? undefined : true,
            }
        }, { skipNull: true });

        router.push(url);
    }

    const Icon = isVideo ? VideoOff: Video;
    const tooltipLabel = isVideo ? t("endVideoButton") : t("startVideoButton");

    return (
        <ActionTooltip side="bottom" label={tooltipLabel}>
            <button 
                onClick={onClick}
                className="hover:opacity-75 transition mr-4"
            >
                <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
            </button>
        </ActionTooltip>
    )
}