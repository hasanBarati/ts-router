import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/app/user-api";
import { useUserStore } from "@/app/user-store";
import type { User } from "@/app/user-api";
import { useEffect } from "react";

export function useUserData() {
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const userInfo = useUserStore((state) => state.userInfo);

  const { data, isLoading } = useQuery<User>({
    queryKey: ["userData"],
    queryFn: fetchUsers,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !userInfo, 
  });


  useEffect(() => {
    if (data ) {
      setUserInfo(data);
    }
  }, [data, setUserInfo, userInfo]);

  return {
    isLoading,
    userInfo,
  };
}
