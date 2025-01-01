import { RequestMapping } from "@nestjs/common";
import { z } from "zod";

export const productsSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    details: z.object({
        description: z.string().optional(),
        Rating: z.number().optional()
    }),
});

export type Product = z.infer<typeof productsSchema>;