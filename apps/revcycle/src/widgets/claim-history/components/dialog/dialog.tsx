import { Dialog } from '@psychplus/ui/dialog'
import { ClaimWidget } from './widget'

const HistoryDialog = (props: {
  open: boolean
  setDialogOpen: (flag: boolean) => void
}) => (
  <Dialog.Root open={props.open} onOpenChange={props.setDialogOpen}>
    <Dialog.Content className="max-w-[600px]">
      <Dialog.Title>Claim History</Dialog.Title>
      <ClaimWidget />
    </Dialog.Content>
  </Dialog.Root>
)

export { HistoryDialog }
