import { Cross2Icon } from '@radix-ui/react-icons'
import { Elements } from '@stripe/react-stripe-js'
import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { useStripe } from '@psychplus/ui/stripe'
import { AddCreditCardForm } from './add-credit-card-form'
import { useAddCreditCard } from './hooks'

const AddCreditCardDialog = () => {
  const { stripePromise } = useStripe()
  const { isDialogOpen, setIsDialogOpen } = useAddCreditCard()

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Content className="relative max-w-[900px]">
        <Dialog.Close
          className="absolute right-4 top-4 cursor-pointer"
          onClick={() => setIsDialogOpen(false)}
        >
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title>Add Card</Dialog.Title>
        <Elements stripe={stripePromise}>
          <AddCreditCardForm />
        </Elements>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddCreditCardDialog }
