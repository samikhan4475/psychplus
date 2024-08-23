import { Button } from '@radix-ui/themes'
import { CopyIcon } from 'lucide-react'

const QuickNotesCopyMyPreviousButton = () => {
  return (
    <Button variant="outline" color="gray" size="1" className="text-black">
      <CopyIcon height={14} width={14} strokeWidth={1.5} />
      Copy My Previous
    </Button>
  )
}

export { QuickNotesCopyMyPreviousButton }
