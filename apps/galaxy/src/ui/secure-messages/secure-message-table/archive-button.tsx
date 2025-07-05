import { Button, Tooltip } from '@radix-ui/themes'
import { ArchiveIcon } from '@/components/icons'
import { useStore } from '../store'
import { Channel, SecureMessagesTab } from '../types'

const ArchiveButton = ({
  channel,
  onSubmit,
}: {
  channel: Channel
  onSubmit: (action: string) => void
}) => {
  const { activeTab } = useStore((state) => ({
    activeTab: state.activeTab,
  }))

  return (
    <Tooltip
      content={activeTab === SecureMessagesTab.INBOX ? 'Archive' : 'Unarchive'}
    >
      <Button
        type="button"
        variant="outline"
        className="hover:bg-pp-table-subRows h-[16px] rounded-2 bg-transparent p-[2px] [box-shadow:none]"
        onClick={(e) => {
          e?.stopPropagation()
          onSubmit('recordStatus')
        }}
      >
        <ArchiveIcon className="fill-pp-icon-sub" />
      </Button>
    </Tooltip>
  )
}

export { ArchiveButton }
