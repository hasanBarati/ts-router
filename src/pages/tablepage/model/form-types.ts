import * as z from "zod";

export interface SelectOption {
  id: number;
  text: string;
}

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "نام باید حداقل 2 کاراکتر باشد",
  }),
  email: z.string().email({
    message: "لطفا یک ایمیل معتبر وارد کنید",
  }),
  destinationHub: z
    .object({
      id: z.number(),
      text: z.string(),
    })
    .nullable(),
});

export type FormValues = z.infer<typeof formSchema>;
