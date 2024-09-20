interface PcpViewProps {
  patientId: string
  googleApiKey: string
}

type PcpAddressType = 'Home' | 'Mailing'

interface Address {
  street1: string
  street2?: string
  city: string
  state?: string
  country?: string
  postalCode: string
  type?: string
  geoCoordinates?: {
    longitude: number
    latitude: number
  }
}

interface PcpAddress extends Address {
  type: PcpAddressType
}

export interface Pcp {
  Id?: string
  PatientId: number
  Metadata?: Metadata
  PhysicianName: PhysicianName
  PhysicianCredentials: string
  PhysicianPhone: string
  PhysicianNpi: string
  PhysicianEmail: string
  PhysicianFax: string
  PhysicianContactDetails: PhysicianContactDetails
  IsMailingAddressSameAsHome: boolean
  RecordStatus: string
}

export interface Metadata {
  CreatedBy: number
  CreatedOn: string
  UpdatedBy: number
  UpdatedOn: string
}

export interface PhysicianName {
  FirstName: string
  LastName: string
}

export interface PhysicianContactDetails {
  Addresses: Address2[]
}

export interface Address2 {
  Type: string
  Street1: string
  Street2: string
  City: string
  State: string
  PostalCode: string
}

export type { Address, PcpAddressType, PcpAddress, PcpViewProps }
