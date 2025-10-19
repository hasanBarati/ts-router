// model/form-types.ts
import {
  requiredPositiveNumber,
  requiredSelect,
  requiredString,
} from "@/shared/lib/zod-config";
import * as z from "zod";

export interface SelectOption {
  id: number;
  text: string;
}

export const formSchema = z.object({
  id:z.number().optional(),
  bagNumber: requiredString(),
  sourceHubId: requiredSelect(),
  bagType: requiredSelect(),
  destinationHubId: requiredSelect(),
  consignmentsDestinationHubId: requiredSelect(),
  ownerHubId: requiredSelect(),
  weightCapacity: requiredPositiveNumber(),
  volumeCapacity: requiredPositiveNumber(),
});

export type FormValues = z.infer<typeof formSchema>;
