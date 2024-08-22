import { type ActiveCodeSet } from '@psychplus/codeset'

interface ActiveCodeSetsDialogProps {
  isEdit?: boolean
  isDialogOpen: boolean
  toggleDialog: () => void
  data?: ActiveCodeSet
  authorityId: string
}

interface ActiveCodeSetDialogClientProps {
  isEdit?: boolean
  isDialogOpen: boolean
  toggleDialog: () => void
  data?: ActiveCodeSet
  authorityId: string
}

interface DeviceIdType {
  type: string
  di: string
  udi: string
}

export type {
  ActiveCodeSetsDialogProps,
  DeviceIdType,
  ActiveCodeSetDialogClientProps,
}
