import { Dialog } from '@psychplus/ui/dialog'
import { useStore } from '../../store'
import { EditClaimStatusForm } from './edit-claim-status-form'

const EditClaimStatusDialog = () => {
  const { claimStatusForEdit, clearClaimStatusForEdit } = useStore((state) => ({
    claimStatusForEdit: state.claimStatusForEdit,
    clearClaimStatusForEdit: state.clearClaimStatusForEdit,
  }))

  const onOpenChange = (open: boolean) => {
    if (!open) {
      clearClaimStatusForEdit()
    }
  }

  return (
    <Dialog.Root
      open={claimStatusForEdit !== undefined}
      onOpenChange={onOpenChange}
    >
      <Dialog.Content className="max-w-[450px]">
        <Dialog.Title>Edit claim status</Dialog.Title>
        <EditClaimStatusForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { EditClaimStatusDialog }
