// model/form-types.ts
import * as z from "zod";

export interface SelectOption {
  id: number;
  text: string;
}

export const formSchema = z.object({
  sourceHubId: z
    .object({
      id: z.number(),
      text: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "هاب مبدا الزامی است",
    }),
  bagType: z
    .object({
      id: z.number(),
      text: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "",
    }),

  destinationHubId: z
    .object({
      id: z.number(),
      text: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "هاب مقصد الزامی است",
    }),

  consignmentsDestinationHubId: z
    .object({
      id: z.number(),
      text: z.string(),
    })
    .nullable()
    .optional(),

    ownerHubId: z
    .object({
      id: z.number(),
      text: z.string(),
    })
    .nullable()
    .optional(),

  weightCapacity: z
    .string()
    .min(1, { message: "ظرفیت وزنی الزامی است" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "ظرفیت وزنی باید عدد مثبت باشد",
    }),

  volumeCapacity: z
    .string()
    .min(1, { message: "ظرفیت حجمی الزامی است" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "ظرفیت حجمی باید عدد مثبت باشد",
    }),
});

export type FormValues = z.infer<typeof formSchema>;
