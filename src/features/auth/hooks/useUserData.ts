import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/app/user-api";
import { useUserStore } from "@/app/user-store";
import type { User } from "@/app/user-api";
import { useEffect } from "react";
import { useAuthStore } from "@/pages/login/model/auth-store";

export function useUserData() {
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const userInfo = useUserStore((state) => state.userInfo);
  const token = useAuthStore((state) => state.token);
 
  const { data, isLoading } = useQuery<User>({
    queryKey: ["userData", token], 
    queryFn: fetchUsers,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!token && userInfo === null,
  });
  
  
  useEffect(() => {
    if (data && !userInfo?.hublist) { 
      setUserInfo(data);
    }
  }, [data, setUserInfo, userInfo?.hublist]);

  return {
    isLoading,
    userInfo,
  };
}