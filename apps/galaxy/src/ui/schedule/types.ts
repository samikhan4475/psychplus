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
  Calendar = 'calendar',
  ProviderCoding = 'ProviderCoding',
  Rounding = 'Rounding',
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

interface AvailableSlots {
  type: 'in-person' | 'video' | 'unavailable'
  isPlusSlot: boolean
  startDate: string
  endDate: string
  duration: number
  servicesOffered: string[]
  teleState: string[]
  timeZoneId: string
}

interface AvailableSlotsInDateFormat
  extends Omit<AvailableSlots, 'startDate' | 'endDate'> {
  startDate: Date
  endDate: Date
  specialist: Specialist
}

interface AvailableSlotsEvent<T> {
  start: Date
  end: Date
  title: string
  data: T
}

interface Specialist {
  id: number
  isTest: boolean
  legalName: {
    firstName: string
    lastName: string
  }
  staffRoleCode: string
  virtualRoomLink?: string
  bio?: string
  hasPhoto?: boolean
  rating?: number
}

interface AvailableSlotsMock extends AvailableSlots {
  specialist: Specialist
}

interface GetAppointmentSlotsResponse<T> {
  appointments: AvailableSlotsEvent<T>[]
  total: number
}

export type {
  PatientRecord,
  Provider,
  SlotsTable,
  AvailableSlots,
  GetAppointmentSlotsResponse,
  AvailableSlotsInDateFormat,
  Specialist,
  AvailableSlotsEvent,
  AvailableSlotsMock,
}

export { TabValue }
