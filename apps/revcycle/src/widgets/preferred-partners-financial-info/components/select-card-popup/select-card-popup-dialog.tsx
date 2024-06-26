import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { SelectCardPopupForm } from './select-card-popup-form'

const SelectCreditCardDialog = ({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean
  setIsDialogOpen: (value: boolean) => void
}) => {
  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Content className="max-w-[900px]">
        <Dialog.Title>
          Credit & Debit Cards
          <Button
            className="float-right bg-transparent text-[#000]"
            onClick={() => setIsDialogOpen(false)}
          >
            X
          </Button>
        </Dialog.Title>
        <SelectCardPopupForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { SelectCreditCardDialog }
