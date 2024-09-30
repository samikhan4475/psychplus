import { PropsWithRow } from '@/components'
import { PatientConsent } from '@/types'

interface RowActionProps extends PropsWithRow<PatientConsent> {
  id?: string
  toggleRowClick?: () => void
  disabled?: boolean
}

export { type RowActionProps }
