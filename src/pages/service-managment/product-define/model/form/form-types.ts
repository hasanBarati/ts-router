// model/form-types.ts
import {
  requiredSelect,
  requiredString
} from "@/shared/lib/zod-config";
import * as z from "zod";


export const formSchema = z.object({
  id:z.number().optional(),
  code: requiredString(),
  description: requiredString(),
  name: requiredString(),
  productGroup: requiredSelect(),
  isActive:z.boolean().optional()
});

export type FormValues = z.infer<typeof formSchema>;
