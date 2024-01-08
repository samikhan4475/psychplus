import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { type Referral } from '../types'

const RowActionDetails = ({
  row: { original: referral },
}: PropsWithRow<Referral>) => {
  return (
    <DropdownMenu.Item
      onClick={() => {
        console.log('details:', referral)
      }}
    >
      Details
    </DropdownMenu.Item>
  )
}

export { RowActionDetails }
