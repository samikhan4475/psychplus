import { Button } from '@radix-ui/themes'
import { CopyIcon } from 'lucide-react'

const QuickNotesCopyPreviousButton = () => {
  return (
    <Button variant="outline" color="gray" size="1" className="text-black">
      <CopyIcon height={14} width={14} strokeWidth={1.5} />
      Copy Previous
    </Button>
  )
}

export { QuickNotesCopyPreviousButton }
