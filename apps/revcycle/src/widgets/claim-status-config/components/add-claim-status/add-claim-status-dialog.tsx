import { Dialog } from '@psychplus/ui/dialog'
import { AddClaimStatusForm } from './add-claim-status-form'
import { useAddClaimStatus } from './hooks'

const AddClaimStatusDialog = () => {
  const { isDialogOpen, setIsDialogOpen } = useAddClaimStatus()

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Content className="max-w-[450px]">
        <Dialog.Title>Add Claim Status</Dialog.Title>
        <AddClaimStatusForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddClaimStatusDialog }
