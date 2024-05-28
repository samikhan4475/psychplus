// ***********     Don't review these files these will change in upcoming functionality ***********

import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { usePubsub } from '@psychplus/utils/event'
import { REFERRAL_DETAILS_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'

const RowActionDetails = ({
  row: { original: referral },
}: PropsWithRow<any>) => {
  const { publish } = usePubsub()

  return (
    <DropdownMenu.Item
      onClick={() => {
        publish(`${REFERRAL_DETAILS_WIDGET}:${EventType.Opened}`, referral)
      }}
    >
      Details
    </DropdownMenu.Item>
  )
}

export { RowActionDetails }
