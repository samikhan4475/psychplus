import { CheckboxCell, PropsWithRow } from '@/components'
import { License } from '../types'

const AlertCell = ({ row }: PropsWithRow<License>) => {
  return (
    <CheckboxCell
      checked={row.original.isAlertCheck}
      className="ml-[-2px]"
      onCheckedChange={(checked) => {}}
      disabled
    />
  )
}

export { AlertCell }
