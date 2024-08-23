import { DropdownMenu } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import type { PatientAllergy } from '../types'

const RowActionEdit = ({
  row: { original: allergy },
}: PropsWithRow<PatientAllergy>) => {
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
