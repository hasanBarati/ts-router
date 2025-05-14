import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import api from "./apiClient";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type MapResponseFn = (item: any) => { id: string | number; text: string };

export const fetchOption = async (
  url: string,
  filter: string = "",
  mapResponse?: MapResponseFn
) => {
  const { data } = await api.get(url, { params: { filter } });

  const items = data.payload?.content ?? [];

  return items.map((item: any) =>
    mapResponse ? mapResponse(item) : { id: item.id, text: item.text }
  );
};
