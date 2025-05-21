// src/features/orders/model/types.ts

// Date DTOs
export interface DateDto {
  year: number;
  month: number;
  day: number;
}

export interface DateTimeDto extends DateDto {
  hour: number;
  minute: number;
}

// Generic ID+Text type
export interface SelectOption {
  id: number;
  text: string;
}

// Filters for querying orders
export interface BagFilters {
  selectsourceHub?: SelectOption | null;
  selectdestinationHub?: SelectOption | null;
  isActive?: boolean;
  bagNumber?: string | null;
}

// Consignment types
export interface ConsignmentType extends SelectOption {}
export interface ContentType extends SelectOption {}

export interface Bag {
  id: number;
  bagNumber: string;
  selectBagType: SelectOption | null;
  selectSourceHub: SelectOption;
  selectConsignmentsDestinationHub: SelectOption | null;
  selectDestinationHub: SelectOption | null;
  selectOwnerHub: SelectOption | null;
  selectCarrier: SelectOption | null;
  isActive: boolean;
  status: SelectOption;
  selecttrip: SelectOption | null;
  selectCurrentHub: SelectOption | null;
  weight: number | null;
  weightCapacity: number;
  volumeCapacity: number;
  allocatedWeight: number | null;
  allocatedVolume: number | null;
  extraLoad: boolean | null;
  extraLoadInVehicleId: number | null;
  lackOfLoad: boolean | null;
  mismatchStatus: SelectOption | null;
}

// API paginated response
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
