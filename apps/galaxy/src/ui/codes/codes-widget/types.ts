import { Appointment, SelectOptionType } from '@/types'
import { CodesWidgetSchemaType } from './codes-widget-schema'

interface VisitProps {
  cptPrimaryCodes: SelectOptionType[]
  cptAddOnsCodes: SelectOptionType[]
  appointment: Appointment
  patientId: string
}

interface UpdatedCptCode {
  field: keyof CodesWidgetSchemaType
  value: string
}
export type { VisitProps, UpdatedCptCode }
