import { Button } from '@radix-ui/themes'
import { SignIcon } from '@/components/icons'

const NoteDetailSignButton = () => {
  return (
    <Button size="1" highContrast>
      <SignIcon width={16} height={16} />
      Send to Sign
    </Button>
  )
}

export { NoteDetailSignButton }
