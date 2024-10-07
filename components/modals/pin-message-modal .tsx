"use client";

import qs from "query-string";
import axios from "axios";
import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog" 

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import "@/languages/i18n"
import { useTranslation } from "react-i18next";

export const PinMessageModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const { t } = useTranslation();

    const isModalOpen = isOpen && type === "pinMessage";
    const { apiUrl, query, onPinned } = data;

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            })

            await axios.patch(url);

            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
     
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        {onPinned ? t("pinMessage") : t("unpinMessage")}
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        {onPinned ? t("pinMessageQuestion") : t("unpinMessageQuestion")}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button 
                            disabled={isLoading}
                            onClick={onClose}
                            variant="ghost"
                        >
                            {t("pinMessageCancelButton")}
                        </Button>
                        <Button
                            disabled={isLoading}
                            onClick={onClick}
                            variant="primary"
                        >
                            {t("pinMessageConfirmButton")}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}