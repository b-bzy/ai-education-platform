import { z } from 'zod';
export const CourseSchema = z.object({
    id: z.string().uuid().optional(),
    slug: z.string(),
    title: z.string(),
    teacherUserId: z.string(),
    ageMin: z.number().int().nonnegative(),
    ageMax: z.number().int().nonnegative(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    priceCents: z.number().int().nonnegative().default(0),
    currency: z.string().default('USD'),
    status: z.enum(['draft', 'published', 'archived']).default('draft')
});
export const ToolSchema = z.object({
    id: z.string().uuid().optional(),
    slug: z.string(),
    name: z.string(),
    description: z.string().optional(),
    pricingModel: z.enum(['free', 'fixed', 'usage']).default('free')
});
export const OrderSchema = z.object({
    id: z.string().uuid().optional(),
    buyerUserId: z.string(),
    offerId: z.string(),
    status: z.enum(['created', 'paid', 'refunded']).default('created'),
    totalCents: z.number().int().nonnegative(),
    txRef: z.string().optional()
});
