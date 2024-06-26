import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@psychplus/ui/button'
import { useAddCreditCard } from './hooks'

const AddCreditCardButton = () => {
  const { openDialog } = useAddCreditCard()

  return (
    <Button onClick={openDialog}  className='bg-[#101D46]'>
      <PlusIcon />
      Add
    </Button>
  )
}

export { AddCreditCardButton }
