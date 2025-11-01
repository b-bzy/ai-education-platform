import { z } from 'zod';
export declare const CourseSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    slug: z.ZodString;
    title: z.ZodString;
    teacherUserId: z.ZodString;
    ageMin: z.ZodNumber;
    ageMax: z.ZodNumber;
    difficulty: z.ZodDefault<z.ZodEnum<["beginner", "intermediate", "advanced"]>>;
    priceCents: z.ZodDefault<z.ZodNumber>;
    currency: z.ZodDefault<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived"]>>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    title: string;
    teacherUserId: string;
    ageMin: number;
    ageMax: number;
    difficulty: "beginner" | "intermediate" | "advanced";
    priceCents: number;
    currency: string;
    status: "draft" | "published" | "archived";
    id?: string | undefined;
}, {
    slug: string;
    title: string;
    teacherUserId: string;
    ageMin: number;
    ageMax: number;
    id?: string | undefined;
    difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
    priceCents?: number | undefined;
    currency?: string | undefined;
    status?: "draft" | "published" | "archived" | undefined;
}>;
export type Course = z.infer<typeof CourseSchema>;
export declare const ToolSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    slug: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    pricingModel: z.ZodDefault<z.ZodEnum<["free", "fixed", "usage"]>>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    name: string;
    pricingModel: "free" | "fixed" | "usage";
    id?: string | undefined;
    description?: string | undefined;
}, {
    slug: string;
    name: string;
    id?: string | undefined;
    description?: string | undefined;
    pricingModel?: "free" | "fixed" | "usage" | undefined;
}>;
export type Tool = z.infer<typeof ToolSchema>;
export declare const OrderSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    buyerUserId: z.ZodString;
    offerId: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<["created", "paid", "refunded"]>>;
    totalCents: z.ZodNumber;
    txRef: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "created" | "paid" | "refunded";
    buyerUserId: string;
    offerId: string;
    totalCents: number;
    id?: string | undefined;
    txRef?: string | undefined;
}, {
    buyerUserId: string;
    offerId: string;
    totalCents: number;
    id?: string | undefined;
    status?: "created" | "paid" | "refunded" | undefined;
    txRef?: string | undefined;
}>;
export type Order = z.infer<typeof OrderSchema>;
