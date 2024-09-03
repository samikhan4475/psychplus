import { Button } from '@radix-ui/themes'
import { UploadIcon } from 'lucide-react'

const CreateNoteUploadButton = () => {
  return (
    <Button
      variant="outline"
      color="gray"
      size="1"
      className="text-black"
      type="button"
    >
      <UploadIcon height={14} width={14} strokeWidth={2} />
      Upload
    </Button>
  )
}

export { CreateNoteUploadButton }
