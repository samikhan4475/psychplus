interface Sort {
  column: string;
  direction: 'asc' | 'desc';
}

interface FetchLocationsParams {
  payload?: Record<string, any>;
  page?: number;
  sort?: Sort;
}

interface AddressType {
  type: string; 
  street1: string; 
  street2?: string; 
  city: string; 
  state: string; 
  postalCode: string;
}

interface PhoneType {
  type: string;
  number: string;
}

export interface FaxType {
  type: string; 
  number: string;
}

interface LocationType {
  id: string;
  locationName: string;
  locationType: string;
  npi: string;
  address: AddressType;
  recordStatus: string;
  isTestLocation?: boolean;
  locationNameGenerated: string;
  cityId: string;
  state: string;
  fax:FaxType;
  phone:PhoneType
}
interface PayloadType {
  searchQuery?: string;
  country?: string;
  [key: string]: string | undefined;
}

export type { LocationType, PayloadType, FetchLocationsParams, Sort }
