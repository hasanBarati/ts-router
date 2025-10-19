// lib/zod-config.ts
import { z } from "zod";

// ✅ تنظیمات کلی برای پیام‌های خطا
export const zodConfig = {
  required_error: "این فیلد الزامی است",
  invalid_type_error: "نوع داده نامعتبر است",
};

// ✅ کاستوم اسکیماهای قابل استفاده مجدد
export const requiredString = (message?: string) =>
  z.string({
    required_error: message || "این فیلد الزامی است",
  }).min(1, { message: message || "این فیلد الزامی است" });

export const requiredNumber = (message?: string) =>
  z.number({
    required_error: message || "این فیلد الزامی است",
    invalid_type_error: message || "عدد وارد کنید",
  });

export const requiredPositiveNumber = (message?: string) =>
  z.string()
    .min(1, { message: message || "این فیلد الزامی است" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "باید عدد مثبت باشد",
    });

// ✅ روش درست - با پیام سفارشی
export const requiredSelect = (message?: string) =>
  z
    .object({
      id: z.number(),
      text: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: message || "این فیلد الزامی است",
    })
    .or(
      z.undefined().refine(() => false, {
        message: message || "این فیلد الزامی است",
      })
    );

// ✅ یا روش بهتر - با superRefine
export const requiredSelect2 = (message?: string) =>
  z
    .union([
      z.object({
        id: z.number(),
        text: z.string(),
      }),
      z.null(),
      z.undefined(),
    ])
    .superRefine((val, ctx) => {
      if (val === null || val === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message || "این فیلد الزامی است",
        });
      }
    });

export const optionalSelect = () =>
  z
    .object({
      id: z.number(),
      text: z.string(),
    })
    .nullable()
    .optional();
