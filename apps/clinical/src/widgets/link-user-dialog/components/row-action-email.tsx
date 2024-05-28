import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { usePubsub } from '@psychplus/utils/event'
import { PREFERRED_PARTNERS_LIST_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'

const RowActionEmail = ({ row: { original: referral } }: PropsWithRow<any>) => {
  const { publish } = usePubsub()

  return (
    <DropdownMenu.Item
      onClick={() => {
        publish(
          `${PREFERRED_PARTNERS_LIST_WIDGET}:${EventType.Opened}`,
          referral,
        )
      }}
    >
      Details
    </DropdownMenu.Item>
  )
}

export { RowActionEmail }
