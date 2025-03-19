import { PropsWithRow, TextCell } from '@/components'
import { License } from '../types'

const LicenseCell = ({ row }: PropsWithRow<License>) => {
  return <TextCell className="pl-1">{row.original.licenseNumber}</TextCell>
}

export { LicenseCell }
