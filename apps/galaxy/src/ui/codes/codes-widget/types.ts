import { Appointment, QuickNoteSectionItem, SelectOptionType } from '@/types'

interface VisitProps {
  cptPrimaryCodes: SelectOptionType[]
  cptAddOnsCodes: SelectOptionType[]
  cptmodifierCodes: SelectOptionType[]
  appointment: Appointment
  patientId: string
  tcmData?: QuickNoteSectionItem[]
  isQuicknoteView?: boolean
}

export type { VisitProps }
