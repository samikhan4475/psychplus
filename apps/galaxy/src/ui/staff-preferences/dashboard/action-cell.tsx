import { Button } from '@radix-ui/themes'
import { type Row } from '@tanstack/react-table'
import { useStore as useGlobalStore } from '@/store'
import { useProviderId } from '@/ui/schedule/hooks'
import { APPROVE_ALERT } from '../constant'
import { PreferenceTab } from '../types'

interface ActionCellProps {
  row: Row<{
    name: PreferenceTab
    isPending: boolean
    onApprove: () => Promise<string | void>
  }>
  canApprove: boolean
  userId: number | undefined
  setAlertInfo: ({
    message,
    isOpen,
  }: {
    message: string
    isOpen: boolean
  }) => void
}

const ActionCell = ({
  canApprove,
  row,
  userId,
  setAlertInfo,
}: ActionCellProps) => {
  const loggedInUser = useGlobalStore((state) => state.user)
  const loggedInProviderId = useProviderId()
  const showApproveButton = loggedInProviderId && loggedInUser.id === userId
  const { isPending } = row.original
  if (!row.original.isPending || !showApproveButton) return null
  return (
    <Button
      variant="outline"
      color="gray"
      size="1"
      className="text-black"
      disabled={!isPending}
      onClick={() => {
        if (!canApprove) {
          setAlertInfo({
            message: APPROVE_ALERT,
            isOpen: true,
          })
          return
        }
        row.original.onApprove()
      }}
      type="button"
    >
      Approve
    </Button>
  )
}

export { ActionCell }
