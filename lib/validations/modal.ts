import { ChannelType } from "@prisma/client";
import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(1, {
        message: "Server name is required."
    }),
    imageUrl: z.string().min(1, {
        message: "Server image is required."
    })
})

export const formSchemaCreateChannel = z.object({
    name: z.string().min(1, {
        message: "Channel name is required."
    }).refine(
        name => name !== "general",
        {
            message: "Channel name cannot be 'general'"
        }
    ),
    type: z.nativeEnum(ChannelType),
    topic: z.string().min(0),
})