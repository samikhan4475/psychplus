interface PrimaryLocation {
  display: string
  contactMade?: string
  locationId?: string
  stateCode: string
  id?: string
}

type TableData = {
  display: string
  stateCode: string
  locationId?: string
}

export type { PrimaryLocation, TableData }
