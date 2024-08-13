import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { useStore } from '../../store'
import { AddCreditCardDialog } from '../add-credit-card'
import { SelectCreditCardDialog } from '../select-card-popup'
import { AddServicesPaymentForm } from './add-services-payment-form'

const AddServicesPaymentDialog = ({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean
  setIsDialogOpen: (value: boolean) => void
}) => {
  const selectCardDialogOpen = useStore((state) => state.selectCardDialogOpen)
  const { setSelectCardDialogOpen } = useStore((state) => ({
    setSelectCardDialogOpen: state.setSelectCardDialogOpen,
  }))

  return (
    <>
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Content className="max-w-[900px]">
          <Dialog.Title>
            Payment{' '}
            <Button
              className="float-right cursor-pointer bg-transparent text-[#000]"
              onClick={() => setIsDialogOpen(false)}
            >
              X
            </Button>
          </Dialog.Title>
          <AddServicesPaymentForm />
        </Dialog.Content>
      </Dialog.Root>
      <SelectCreditCardDialog
        isDialogOpen={selectCardDialogOpen}
        setIsDialogOpen={setSelectCardDialogOpen}
      />
      <AddCreditCardDialog />
    </>
  )
}

export { AddServicesPaymentDialog }
