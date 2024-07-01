import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { Guardians } from '../types'

const RowActionDetails = ({
  row: { original: linkAccount },
}: PropsWithRow<Guardians>) => {
  return (
    <DropdownMenu.Item>
      Details
    </DropdownMenu.Item>
  )
}

export { RowActionDetails }
