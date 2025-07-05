import { MailOpenIcon } from '@/components/icons'
import { Button, Tooltip } from '@radix-ui/themes'

const MarkAsReadButton = ({
  onSubmit,
}: {
  onSubmit: (action: string) => void
}) => (
  <Tooltip content="Mark as Read">
    <Button
      className="hover:bg-pp-table-subRows h-[16px] rounded-2 bg-transparent p-[2px] [box-shadow:none]"
      type="button"
      onClick={(e) => {
        e?.stopPropagation()
        onSubmit('messageStatus')
      }}
    >
      <MailOpenIcon className="fill-pp-icon-sub" width={14} />
    </Button>
  </Tooltip>
)

export { MarkAsReadButton }
