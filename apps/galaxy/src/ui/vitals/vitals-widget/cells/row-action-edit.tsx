import { DropdownMenu } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import type { PatientVital } from '../types'

const RowActionEdit = ({
  row: { original: vital },
}: PropsWithRow<PatientVital>) => {
  return (
    <DropdownMenu.Item
      onClick={() => {
        console.log('edit:', vital)
      }}
    >
      Edit
    </DropdownMenu.Item>
  )
}

export { RowActionEdit }
