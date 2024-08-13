import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { useStore } from '../../store'
import { AddServicesCustomChargeForm } from './add-services-custom-charge-form'

const AddServicesCustomChargeDialog = () => {
  const customChargePopup = useStore((state) => state.customChargePopup)
  const { setCustomChargePopup } = useStore((state) => ({
    setCustomChargePopup: state.setCustomChargePopup,
  }))

  return (
    <Dialog.Root open={customChargePopup} onOpenChange={setCustomChargePopup}>
      <Dialog.Content className="max-w-[600px]">
        <Dialog.Title>
          Custom Charge
          <Button
            className="float-right cursor-pointer bg-transparent text-[#000]"
            onClick={() => setCustomChargePopup(false)}
          >
            X
          </Button>{' '}
        </Dialog.Title>
        <AddServicesCustomChargeForm setIsDialogOpen={setCustomChargePopup} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddServicesCustomChargeDialog }
