import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { Elements } from '@stripe/react-stripe-js'
import { useStripe } from '@psychplus/ui/stripe'
import { AddCreditCardForm } from './add-credit-card-form'
import { useAddCreditCard } from './hooks'

const AddCreditCardDialog = () => {
  const { stripePromise } = useStripe()
  const { isDialogOpen, setIsDialogOpen } = useAddCreditCard()

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Content className="max-w-[900px]">
        <Dialog.Title>
          Add Card{' '}
          <Button
            className="text-black bg-transparent text-right"
            onClick={() => setIsDialogOpen(false)}
          >
            X
          </Button>{' '}
        </Dialog.Title>
        <Elements stripe={stripePromise}>
          <AddCreditCardForm />
        </Elements>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddCreditCardDialog }
