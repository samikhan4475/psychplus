import { Appointment, SelectOptionType } from '@/types'

interface VisitProps {
  cptPrimaryCodes: SelectOptionType[]
  cptAddOnsCodes: SelectOptionType[]
  cptmodifierCodes: SelectOptionType[]
  appointment: Appointment
  patientId: string
}

export type { VisitProps }
