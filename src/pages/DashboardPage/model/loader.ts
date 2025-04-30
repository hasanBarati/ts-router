import { fetchUsers } from "../api/dashboardApi"


export const loadUsers = async () => {
  const users = await fetchUsers()
  return { users }
}