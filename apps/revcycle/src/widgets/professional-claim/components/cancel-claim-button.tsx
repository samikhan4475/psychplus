import { Cross1Icon } from '@radix-ui/react-icons'
import { Button } from '@psychplus/ui/button'

const CancelClaimButton = () => {
  const cancelClaim = () => {
    console.log('cancel claim')
  }

  return (
    <Button variant="soft" onClick={cancelClaim}>
      <Cross1Icon />
      Cancel
    </Button>
  )
}

export { CancelClaimButton }
