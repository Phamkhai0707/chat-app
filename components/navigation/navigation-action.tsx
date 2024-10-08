"use client"

import { Plus } from "lucide-react"

import { ActionTooltip } from "@/components/action-tooltip"
import { useModal } from "@/hooks/use-modal-store"
import "@/languages/i18n"
import { useTranslation } from "react-i18next"

export const NavigationAction = () => {
    const { onOpen } = useModal();
    const { t } = useTranslation();

    return (
        <div>
            <ActionTooltip
                side="right"
                align="center"
                label={t("addServer")}
            >
                <button
                    onClick={() => onOpen("createServer")}
                    className="group flex items-center"
                >
                    <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-backgound dark:bg-neutral-700 group-hover:bg-emerald-500 bg-white">
                        <Plus className="group-hover:text-white transition text-emerald-500" size={25}/>
                    </div>
                </button>
            </ActionTooltip>
        </div>
    )
}