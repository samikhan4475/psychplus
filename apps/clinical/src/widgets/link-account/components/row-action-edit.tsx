import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { LinkAccount } from '../types'

const RowActionEdit = ({
  row: { original: linkAccount },
}: PropsWithRow<LinkAccount>) => {

  return (
    <DropdownMenu.Item>
      Edit
    </DropdownMenu.Item>
  )
}

export { RowActionEdit }
