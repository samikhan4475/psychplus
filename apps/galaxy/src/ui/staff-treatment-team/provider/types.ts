interface PrimaryProviderList {
  dateTime: string
  patientName: string
  location: string
  id: number
}

type Patient = {
  patientId: number
  patientName: {
    firstName: string
    middleName?: string
    lastName: string
  }
  patientState: string
  isPrimary: boolean
  addedOn: string
}

export { type PrimaryProviderList, type Patient }
