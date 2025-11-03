
export type User = {
  id: number
  name: string
}

export const fetchUsers = async (): Promise<User[]> => {
  return await fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
}