type Metadata = {
  createdOn?: Date
  createdBy?: number
  createdByFullName?: string
  updatedOn?: Date
  updatedBy?: number
  updatedByFullName?: string
  deletedOn?: Date
  deletedBy?: number
  deletedByFullName?: string
}

type Address = {
  type?: string
  street1?: string
  street2?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
  geoCoordinates?: {
    longitude?: number
    latitude?: number
    altitude?: number
  }
}

type LegalName = {
  firstName: string
  middleName?: string
  lastName: string
  preferredName?: string
  title?: string
  honors?: string
}

type Contact = {
  email?: string
  phoneNumbers?: [
    {
      type?: string
      number?: string
    },
  ]
  addresses?: Address[]
}

export type { Metadata, Address, Contact, LegalName }
