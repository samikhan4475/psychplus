interface ContactDetails {
  addresses?: { type: string; address: string }[]
  email?: string
  phoneNumbers?: { type: string; number: string }[]
  city?: string
  zipcode?: string
}

interface AddLinkAccountListResponse {
  name?: {
    firstName?: string
    middleName?: string
    lastName?: string
  }
  age?: number
  gender?: string
  mrn?: string
  dob?: string
  phone?: string
  email?: string
  contactDetails?: ContactDetails
  insurance?: string
  user?: string
  visit?: string
  patientstatus?: string
  cc?: string
}

interface LinkAccountTable {
  mrn: string
  phone: string
  email: string
  status: string
  signIn: string
  scheduleMessagingOrders: string
  priority: string
}

export { type AddLinkAccountListResponse, type LinkAccountTable }
