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

export const DeleteMessageModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const { t } = useTranslation();

    const isModalOpen = isOpen && type === "deleteMessage";
    const { apiUrl, query } = data;

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            })

            await axios.delete(url);

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
                        {t("deleteMessage")}
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        {t("deleteMessageModalContent")}<br/>
                        {t("deleteMessageModalWarning")}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button 
                            disabled={isLoading}
                            onClick={onClose}
                            variant="ghost"
                        >
                            {t("deleteMessageCancelButton")}
                        </Button>
                        <Button
                            disabled={isLoading}
                            onClick={onClick}
                            variant="primary"
                        >
                            {t("deleteMessageConfirmButton")}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}