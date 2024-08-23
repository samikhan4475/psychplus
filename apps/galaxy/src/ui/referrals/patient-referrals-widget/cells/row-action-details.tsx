import { DropdownMenu } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import type { PatientReferral } from '../types'

const RowActionDetails = ({
  row: { original: allergy },
}: PropsWithRow<PatientReferral>) => {
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
