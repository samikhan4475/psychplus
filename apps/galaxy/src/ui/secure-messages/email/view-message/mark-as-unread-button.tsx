import { Button, Tooltip } from '@radix-ui/themes'
import { MailIcon } from '@/components/icons'

const MarkAsUnreadButton = ({
  onSubmit,
}: {
  onSubmit: (action: string) => void
}) => (
  <Tooltip content="Mark as Unread">
    <Button
      className="hover:bg-pp-table-subRows h-[16px] rounded-2 bg-transparent p-[2px] [box-shadow:none]"
      type="button"
      onClick={(e) => {
        e?.stopPropagation()
        onSubmit('messageStatus')
      }}
    >
      <MailIcon
        onClick={() => onSubmit('messageStatus')}
        width={16}
        height={16}
        className="fill-pp-icon-sub"
      />
    </Button>
  </Tooltip>
)

export { MarkAsUnreadButton }
