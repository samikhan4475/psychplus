import { Button } from '@radix-ui/themes'
import { UploadIcon } from 'lucide-react'

const QuickNotesUploadButton = () => {
  return (
    <Button size="1" highContrast>
      <UploadIcon height={14} width={14} strokeWidth={2} />
      Upload
    </Button>
  )
}

export { QuickNotesUploadButton }
