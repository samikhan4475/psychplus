import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { LinkAccount } from '../types'

const RowActionDetails = ({
  row: { original: linkAccount },
}: PropsWithRow<LinkAccount>) => {
  return (
    <DropdownMenu.Item>
      Details
    </DropdownMenu.Item>
  )
}

export { RowActionDetails }
