import { Dialog } from '@psychplus/ui/dialog'
import { useStore } from '../../store'
import { ReassignClaimForm } from './reassign-claim-form'

const ReassignClaimDialog = () => {
  const { claimStatusesForDeactivation, clearClaimStatusesForDeactivation } =
    useStore((state) => ({
      claimStatusesForDeactivation: state.claimStatusesForDeactivation,
      clearClaimStatusesForDeactivation:
        state.clearClaimStatusesForDeactivation,
    }))

  const onOpenChange = (open: boolean) => {
    if (!open) {
      clearClaimStatusesForDeactivation()
    }
  }

  return (
    <Dialog.Root
      open={claimStatusesForDeactivation !== undefined}
      onOpenChange={onOpenChange}
    >
      <Dialog.Content className="max-w-[450px]">
        <Dialog.Title>Re-Assign Claims</Dialog.Title>
        <Dialog.Description>
          Select status to assign claims of the deleted status.
        </Dialog.Description>
        <ReassignClaimForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ReassignClaimDialog }
