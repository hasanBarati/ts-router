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
export interface OrderFilters {
  selectHub?: SelectOption | null;
  orderDate?: DateDto | null;
  selectCustomer?: SelectOption | null;
}

// Consignment types
export interface ConsignmentType extends SelectOption {}
export interface ContentType extends SelectOption {}

// Individual consignment
export interface Consignment {
  id: number;
  selectDeliveryHub?: SelectOption | null;
  selectPickupHub?: SelectOption | null;
  selectHoldingHub?: SelectOption | null;
  selectOriginHub?: SelectOption | null;
  destinationHubId?: number | null;
  isActive?: boolean | null;
  selectConsignmentType: ConsignmentType;
  cprNumber: number;
  status: number;
  selectPickUpType?: SelectOption | null;
  width: number;
  height: number;
  length: number;
  volume: number;
  weight: number;
  value: number;
  contentType: ContentType;
  needToReciveCostOfGoods: boolean;
  costOfGoods?: number | null;
  needToPack: boolean;
  numberOfPieces: number;
  selectDeliveryType?: SelectOption | null;
  selectReturnType?: SelectOption | null;
  isTripAssigned?: boolean | null;
  rescheduledDate?: DateTimeDto | null;
  orderServiceTime?: string | null;
  selectCnDirection: number;
  pickupAddressId?: number | null;
  bagId?: number | null;
  thirdPartyId?: number | null;
  consignmentServices?: unknown[] | null;
  orderDto?: unknown | null;
  labeldto?: unknown | null;
  content: SelectOption;
  contentofOthers?: string | null;
  senderDescription?: string | null;
  messageForReciever?: string | null;
  messageForDriver?: string | null;
  packingCost: number;
  selectPaymentMethod?: SelectOption | null;
  deliveryAddressId: number;
  receiverAddressId: number;
  receiverPhoneId: number;
  receiverCustomerId?: number | null;
  receiverProspectId?: number | null;
  parent?: number | null;
  nextConsignment: Consignment[];
  trackingCode: string;
  deliveryHubId: number;
  currentHubId: number;
  pickupHubId?: number | null;
  holdingHubId?: number | null;
  originHubId: number;
  originHubOfLastTripId?: number | null;
  returnHubId?: number | null;
  declarativeWeight: number;
  declarativeVolume: number;
  declarativeLength: number;
  declarativeWidth: number;
  declarativeHeight: number;
  declarativeValue: number;
  selectPackage?: SelectOption | null;
  thirdPartyDelivery?: unknown | null;
}

// Order entity
export interface Order {
  invoiceDtoList?: unknown[] | null;
  id: number;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: DateTimeDto;
  trackingCode: string;
  orderDateDto: DateDto;
  selectPaymentMethod?: SelectOption | null;
  selectStatus: SelectOption;
  consignments: Consignment[];
  orderServices?: unknown | null;
  selectCustomer: SelectOption;
  selectSenderAddress: SelectOption;
  selectSenderPhone: SelectOption;
  selectReturnAddress: SelectOption;
  selectPickupAddress: SelectOption;
  selectHoldingHub: SelectOption;
  selectPickupHub: SelectOption;
  selectReturnHub: SelectOption;
  pickUpDateDto?: DateDto | null;
  pickUpTimeFrom?: string | null;
  pickUpTimeTo?: string | null;
  orderRegistrationHub: SelectOption;
  senderHubId: number;
  consignmentCount: number;
  easyOrder?: boolean | null;
  author: string;
  modifier: string;
  orderPrice?: number | null;
  invoicePrice?: number | null;
  modifiedDate: number;
}

// API paginated response
export interface DataResponse<T> {
  content: T[];
  pageable: {
    sort: { sorted: boolean; empty: boolean; unsorted: boolean };
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
  sort: { sorted: boolean; empty: boolean; unsorted: boolean };
  first: boolean;
  empty: boolean;
}
