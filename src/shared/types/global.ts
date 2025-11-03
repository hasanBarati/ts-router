export interface UserType {
  isSuperAdmin: boolean;
  perms: string[];
  permissionArray: { permission: string[] }[];
  hublist: [];
  selectEmployee?: selectResponse;
  userinfo?: selectResponse;
}

export type selectResponse = {
  id: number;
  text: string;
};

export interface DateDto {
  year: number;
  month: number;
  day: number;
}

export interface DateTimeDto extends DateDto {
  hour: number;
  minute: number;
}


export interface DataResponse<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    pageSize: number;
    pageNumber: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  first: boolean;
  empty: boolean;
}
