
import api from "@/shared/lib/apiClient";

export type User = {
  id: number;
  name: string;
};

export const fetchUsers = async (): Promise<User[]> => {
   
  return await api
    .post(
      "/consignment-api/consignment/orederfilter?pageNumber=1&pageSize=10",
      {
        selectHub: {
          id: 2,
          value: "B1",
          label: "هاب تهران",
          parent: null,
          children: null,
          text: "هاب تهران",
        },
        orderDate: {
          day: 14,
          month: 2,
          year: 1404,
        },
      }
    )
    .then((res) => res.data);
};
