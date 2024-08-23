import { DropdownMenu } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import type { PatientMedication } from '../types'

const RowActionEdit = ({
  row: { original: allergy },
}: PropsWithRow<PatientMedication>) => {
  return (
    <DropdownMenu.Item
      onClick={() => {
        console.log('edit:', allergy)
      }}
    >
      Edit
    </DropdownMenu.Item>
  )
}

export { RowActionEdit }
