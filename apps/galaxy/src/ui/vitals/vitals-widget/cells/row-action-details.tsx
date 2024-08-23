import { DropdownMenu } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import type { PatientVital } from '../types'

const RowActionDetails = ({
  row: { original: vital },
}: PropsWithRow<PatientVital>) => {
  return (
    <DropdownMenu.Item
      onClick={() => {
        console.log('details:', vital)
      }}
    >
      Details
    </DropdownMenu.Item>
  )
}

export { RowActionDetails }
