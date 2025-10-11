import * as z from "zod";

export interface SelectOption {
  id: number;
  text: string;
}

export const formSchema = z.object({
  // name: z.string().min(2, {
  //   message: "نام باید حداقل 2 کاراکتر باشد",
  // }),
  // email: z.string().email({
  //   message: "لطفا یک ایمیل معتبر وارد کنید",
  // }),
  selectSourceHub: z
    .object({
      id: z.number(),
      text: z.string(),
    })
,

  selectDestinationHub: z
    .object({
      id: z.number(),
      text: z.string(),
    }),



  // .nullable(),
  // .nullable(),
  selectBagTypes: z.object({ id: z.number(), text: z.string() }).nullable(),
  selectCarrier: z.object({ id: z.number(), text: z.string() }).nullable(),
  weightCapacity: z.string().nonempty({ message: "ظرفیت وزنی الزامی است" }),
  volumeCapacity: z.string().nonempty({ message: "ظرفیت وزنی الزامی است" }),
});

export type FormValues = z.infer<typeof formSchema>;
