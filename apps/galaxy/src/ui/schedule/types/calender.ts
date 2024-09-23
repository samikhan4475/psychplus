import z from 'zod'
import { calenderViewSchema } from '../calendar-view/calender-view-schema'
import { StaffAppointmentAvailability } from './appointments'
import { BookedAppointment } from './schedule'

type CalenderViewSchemaType = z.infer<typeof calenderViewSchema>

type AppointmentEventData = BookedAppointment | StaffAppointmentAvailability

interface AvailableSlotsEvent<T> {
  start: Date
  end: Date
  title: string
  data: T
}

interface Option {
  value: string
  label: string
}

export type {
  Option,
  AppointmentEventData,
  AvailableSlotsEvent,
  CalenderViewSchemaType,
}

enum VisitType {
  InPerson = 'in-person',
  TeleVisit = 'TeleVisit',
  Video = 'video',
  Unavailable = 'unavailable',
  Either = 'either',
}

enum AppointmentType {
  Booked = 'booked',
  Available = 'available',
}

const eventSeparatorClassIndex = {
  [VisitType.Video]: 'bg-pp-accent-mint',
  [VisitType.InPerson]: 'bg-pp-states-info',
  [VisitType.Unavailable]: 'bg-pp-states-error',
  [VisitType.Either]: 'bg-pp-states-error',
  [VisitType.TeleVisit]: 'bg-pp-states-info',
}

const eventContainerClassIndex = {
  [VisitType.Video]: 'bg-pp-green-100',
  [VisitType.InPerson]: 'bg-pp-blue-100',
  [VisitType.Unavailable]: 'bg-pp-red-100',
  [VisitType.Either]: 'bg-pp-red-100',
  [VisitType.TeleVisit]: 'bg-pp-blue-100',
}

const eventContainerClassType = {
  [AppointmentType.Booked]: 'bg-pp-green-100',
  [AppointmentType.Available]: 'bg-pp-blue-100',
}

export {
  eventSeparatorClassIndex,
  eventContainerClassIndex,
  eventContainerClassType,
  AppointmentType,
  VisitType,
}
