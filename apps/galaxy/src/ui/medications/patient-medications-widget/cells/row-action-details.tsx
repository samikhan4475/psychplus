import { DropdownMenu } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import type { PatientMedication } from '../types'

const RowActionDetails = ({
  row: { original: allergy },
}: PropsWithRow<PatientMedication>) => {
  return (
    <DropdownMenu.Item
      onClick={() => {
        console.log('details:', allergy)
      }}
    >
      Details
    </DropdownMenu.Item>
  )
}

export { RowActionDetails }
