import { Button } from '@radix-ui/themes'
import { SignIcon } from '@/components/icons'

const NotesSendCosignerButton = () => {
  return (
    <Button size="1" highContrast>
      <SignIcon width={16} height={16} />
      Send to Cosigner
    </Button>
  )
}

export { NotesSendCosignerButton }
