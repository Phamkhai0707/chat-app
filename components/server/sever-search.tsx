"use client"

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useParams, useRouter } from "next/navigation";
import "@/languages/i18n"
import { useTranslation } from "react-i18next";

interface ServerSearchProps {
    data: {
        label: string,
        type: "channel" | "member",
        data: {
            icon: React.ReactNode;
            name: string;
            id: string;
        }[] | undefined
    }[]
}

export const ServerSearch = ({
    data
}: ServerSearchProps) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();
    const { t } = useTranslation();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if(e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down)
    }, []);

    const onClick = ({ id, type }: { id: string, type: "channel" | "member"}) => {
        setOpen(false);

        if(type === "member") {
            return router.push(`/servers/${params?.serverId}/conversation/${id}`)
        }

        if(type === "channel") {
            return router.push(`/servers/${params?.serverId}/channels/${id}`)
        }
    }

    return (
        <>
            <button 
                onClick={() => setOpen(true)}
                className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
            >
                <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400"/>
                <p 
                    className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition"
                >
                    {t("search")}
                </p>
                <kbd
                    className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bt-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto"
                >
                    <span className="text-xs">Ctrl</span>K
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder={t("commadInputSearchPlaceHolder")}/>
                <CommandList>
                    <CommandEmpty>
                        {t("notFound")}
                    </CommandEmpty>
                    {data.map(({ label, type, data}) => {
                        if(!data?.length) return null;

                        if(label === "Text-Channels") {
                            return (
                                <CommandGroup key={label} heading={t("searchTextChannelsLabel")}>
                                    {data?.map(({ id, icon, name }) => {
                                        return (
                                            <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                                                {icon}
                                                <span>{name}</span>
                                            </CommandItem>
                                        )
                                    })}
                                </CommandGroup>
                            )
                        }

                        if(label === "Audio-Channels") {
                            return (
                                <CommandGroup key={label} heading={t("searchAudioChannelsLabel")}>
                                    {data?.map(({ id, icon, name }) => {
                                        return (
                                            <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                                                {icon}
                                                <span>{name}</span>
                                            </CommandItem>
                                        )
                                    })}
                                </CommandGroup>
                            )
                        }

                        if(label === "Video-Channels") {
                            return (
                                <CommandGroup key={label} heading={t("searchVideoChannelsLabel")}>
                                    {data?.map(({ id, icon, name }) => {
                                        return (
                                            <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                                                {icon}
                                                <span>{name}</span>
                                            </CommandItem>
                                        )
                                    })}
                                </CommandGroup>
                            )
                        }

                        return (
                            <CommandGroup key={label} heading={t("searchMembersLabel")}>
                                {data?.map(({ id, icon, name }) => {
                                    return (
                                        <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                                            {icon}
                                            <span>{name}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        )
                    })}
                </CommandList>
            </CommandDialog>
        </>
    )
}