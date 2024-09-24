"use client"

import { useSocket } from "@/components/providers/socket-provider"
import { Badge } from "@/components/ui/badge"
import "@/languages/i18n"
import { useTranslation } from "react-i18next"

export const SocketIndicator = () => {
    const { isConnected } = useSocket();
    const { t } = useTranslation();

    if(!isConnected) {
        return (
            <Badge
                variant="outline"
                className="bg-yellow-600 text-white border-none"
            >
                {t("offline")}
            </Badge>
        )
    }

    return (
        <Badge
            variant="outline"
            className="bg-emerald-600 text-white border-none"
        >
            {t("online")}
        </Badge>
    )
}