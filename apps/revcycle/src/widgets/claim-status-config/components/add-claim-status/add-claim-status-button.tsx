import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@psychplus/ui/button'
import { useAddClaimStatus } from './hooks'

const AddClaimStatusButton = () => {
  const { openDialog } = useAddClaimStatus()

  return (
    <Button onClick={openDialog}>
      <PlusIcon />
      Add
    </Button>
  )
}

export { AddClaimStatusButton }
