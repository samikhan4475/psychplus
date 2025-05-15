import { Row } from '@tanstack/react-table'
import { Appointment } from '@/types'
import { formatTimeCell } from '@/ui/schedule/utils'

const sortOnAppointmentDate = (a: Row<Appointment>, b: Row<Appointment>) => {
  const timeA = formatTimeCell(
    a.original.appointmentDate,
    a.original.locationTimezoneId,
  )
  const timeB = formatTimeCell(
    b.original.appointmentDate,
    b.original.locationTimezoneId,
  )
  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }
  return toMinutes(timeA) - toMinutes(timeB)
}

const sortOnDob = (a: Row<Appointment>, b: Row<Appointment>) => {
  const timeA = new Date(a.original?.dob ?? '')
  const timeB = new Date(b.original?.dob ?? '')
  return timeB.getTime() - timeA.getTime()
}

export { sortOnAppointmentDate, sortOnDob }
