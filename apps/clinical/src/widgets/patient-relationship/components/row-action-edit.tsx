import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { Guardians } from '../types'

const RowActionEdit = ({
  row: { original: linkAccount },
}: PropsWithRow<Guardians>) => {

  return (
    <DropdownMenu.Item>
      Edit
    </DropdownMenu.Item>
  )
}

export { RowActionEdit }
