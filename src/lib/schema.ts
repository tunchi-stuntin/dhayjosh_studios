import { z } from 'zod';

export const bookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  packageId: z.string().min(1),
  date: z.string().regex(/\d{4}-\d{2}-\d{2}/),
  startHour: z.number().int().min(0).max(23),
  hours: z.number().int().min(1).max(12),
  addons: z.array(
    z.object({
      addonId: z.string(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export type BookingPayload = z.infer<typeof bookingSchema>;

export const aiSchema = z.object({
  message: z.string().min(1),
  context: z.record(z.string(), z.any()).optional(),
});

export type AIRequestPayload = z.infer<typeof aiSchema>;
