import { type HealthConcern } from '@psychplus/health-concerns'

interface HealthConcernDialogProps {
  isEdit?: boolean
  isDialogOpen: boolean
  toggleDialog: () => void
  data?: HealthConcern
  patientId: number
  noteId: number
}

interface HealthConcernDialogClientProps {
  isEdit?: boolean
  isDialogOpen: boolean
  toggleDialog: () => void
  data?: HealthConcern
}

interface DeviceIdType {
  type: string
  di: string
  udi: string
}

export type OptionType = {
  value: string
  label: string
}

export type {
  HealthConcernDialogProps,
  DeviceIdType,
  HealthConcernDialogClientProps,
}
