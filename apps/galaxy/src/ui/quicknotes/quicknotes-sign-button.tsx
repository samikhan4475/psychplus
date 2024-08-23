import { Button } from '@radix-ui/themes'
import { PenLineIcon } from 'lucide-react'

const QuickNotesSignButton = () => {
  return (
    <Button size="1" highContrast>
      <PenLineIcon height={14} width={14} strokeWidth={2} />
      Sign
    </Button>
  )
}

export { QuickNotesSignButton }
