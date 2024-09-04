interface Visit {
  type: string
  sequence: string
  medium: string
  status: string
  date: string
  insVerification: string
}

interface Slot {
  id: number
  duration: string
}

type SlotsTable = {
  [key: string]: Slot[]
}

interface Availability {
  time: string
  monthDay: string
  date: string
  day: string
}

interface Provider {
  id: number
  speciality: string
  slots: SlotsTable
  nextAvailability: Availability[]
}
interface Balance {
  due: string
  paid: string
}

enum TabValue {
  Scheduler = 'scheduler',
  List = 'list',
  Calender = 'calendar',
}

interface PatientRecord {
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

export type { PatientRecord, Provider, SlotsTable }

export { TabValue }
