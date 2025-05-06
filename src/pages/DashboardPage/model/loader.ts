import { useAuthStore } from "@/app/auth-store";
import { fetchUsers } from "../api/dashboardApi"
import { useDashboardStore } from "./dashboardStore";


export const loadUsers = async () => {
  const users = await fetchUsers()
  useDashboardStore.getState().setItems(users);
  return { users }
}