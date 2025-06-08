import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/app/tableAPI";
import { useUserStore } from "@/app/user-store";
import type { User } from "@/app/tableAPI";
import { useEffect } from "react";

export function useUserData() {
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const userInfo = useUserStore((state) => state.userInfo);

  const { data, isLoading } = useQuery<User>({
    queryKey: ["userData"],
    queryFn: fetchUsers,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !userInfo, // Only fetch if we don't have user data
  });

  // Update user store when data changes
  useEffect(() => {
    if (data && !userInfo) {
      setUserInfo(data);
    }
  }, [data, setUserInfo, userInfo]);

  return {
    isLoading,
    userInfo,
  };
}
