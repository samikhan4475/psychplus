import { type Referral } from '@psychplus/referrals'
import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'

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
