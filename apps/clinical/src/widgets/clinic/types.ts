interface Visit {
    type: string
    sequence: string
    medium: string
    status: string
    date: string
    insVerification: string
}

interface Balance {
    due: string
    paid: string
}

interface TableData {
  id: number
  date: string
  name: string
  age: number
  gender: string
  dob: string
  ptStatus: string
  p: string
  i: string
  c: string
  cc: string
  state: string
  Location: string
  providerType: string
  provider: string
  primaryInsurance: string
  secondaryInsurance: string
  visit: Visit
  coPay: Balance
  coIns: Balance
  balance: Balance
  nodeSigned: boolean
}

interface Slot {
  duration: string
  id: number
}
type SlotsTable = { [key: string]: Slot[] }

interface Availability {
  date: string
  day: string
  monthDay: string
  time: string
}

interface Provider {
  slots: SlotsTable
  speciality: string
  id: number
  nextAvailability: Availability[]
}

export type { TableData, Provider, SlotsTable }