interface PhoneNumber {
    type: string;
    number: string;
  }
  
  interface GeoCoordinates {
    longitude: number;
    latitude: number;
    altitude: number;
  }
  
  interface Address {
    type: string;
    street1: string;
    street2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    geoCoordinates: GeoCoordinates;
  }
  
  interface ContactDetails {
    email: string;
    emailVerificationStatus: string;
    phoneNumbers: PhoneNumber[];
    addresses: Address[];
  }
  
  interface Metadata {
    createdOn: string;
    createdBy: number;
    createdByFullName: string;
    updatedOn: string;
    updatedBy: number;
    updatedByFullName: string;
    deletedOn: string;
    deletedBy: number;
    deletedByFullName: string;
  }
  
  interface PreferredPartner {
    id: string;
    metadata: Metadata;
    name: string;
    individualRate: number;
    coupleRate: number;
    familyRate: number;
    subscriptionStatus: string;
    payerStatus: string;
    billingFrequency: string;
    plusChargeAmount: number;
    serviceChargeAmount: number;
    startDate: string;
    nextPaymentDate: string;
    contactDetails: ContactDetails;
    recordStatus: string;
    isTest: boolean;
  }

  export type { PreferredPartner }