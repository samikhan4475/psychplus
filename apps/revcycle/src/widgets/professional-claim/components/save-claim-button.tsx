import { CheckIcon } from '@radix-ui/react-icons'
import { Button } from '@psychplus/ui/button'

const SaveClaimButton = () => {
  const saveClaim = () => {
    console.log('save claim')
  }

  return (
    <Button variant="solid" onClick={saveClaim}>
      <CheckIcon />
      Save
    </Button>
  )
}

export { SaveClaimButton }
