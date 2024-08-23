import { Button } from '@radix-ui/themes'
import { EyeIcon } from 'lucide-react'

const QuickNotesViewNoteButton = () => {
  return (
    <Button variant="outline" color="gray" size="1" className="text-black">
      <EyeIcon height={14} width={14} strokeWidth={1.5} />
      View Note
    </Button>
  )
}

export { QuickNotesViewNoteButton }
