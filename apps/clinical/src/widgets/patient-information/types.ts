type MetaDataType = {
  createdOn: string
  createdBy: number
  createdByFullName: string
  updatedOn: string
  updatedBy: number
  updatedByFullName: string
}

type AddressType = {
  type: string
  street1: string
  city: string
  state: string
  postalCode: string
}

type ContactType = {
  email: string
  phoneNumbers: { type: string; number: string }[]
  addresses: AddressType[]
}
interface PatientProfileInformation {
  id: number
  metadata: MetaDataType
  userId: number
  legalName: { firstName: string; lastName: string }
  birthdate: string
  gender: string
  chargeKey: string
  isPlusMember: boolean
  hasPhoto: boolean
  contactDetails: ContactType
}

export type { PatientProfileInformation }
