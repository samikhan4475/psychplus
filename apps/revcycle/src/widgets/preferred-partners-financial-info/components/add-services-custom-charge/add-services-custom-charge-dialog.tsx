import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { AddServicesCustomChargeForm } from './add-services-custom-charge-form'

const AddServicesCustomChargeDialog = ({
  isopen,
  setIsDialogOpen,
}: {
  isopen: boolean
  setIsDialogOpen: (value: boolean) => void
}) => {
  return (
    <Dialog.Root open={isopen} onOpenChange={setIsDialogOpen}>
      <Dialog.Content className="max-w-[600px]">
        <Dialog.Title>
          Custom Charge
          <Button
            className="float-right bg-transparent text-[#000]"
            onClick={() => setIsDialogOpen(false)}
          >
            X
          </Button>{' '}
        </Dialog.Title>
        <AddServicesCustomChargeForm setIsDialogOpen={setIsDialogOpen} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddServicesCustomChargeDialog }
