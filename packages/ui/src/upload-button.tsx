import { ChangeEvent, useRef } from 'react'
import { UploadIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'

interface Props {
    onFileChange: (file: File | undefined) => void
    className?: string
}

const UploadButton = ({
  onFileChange,
  className,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileInputClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    onFileChange?.(selectedFile || undefined)
  }

  return (
    <Button
      onClick={handleFileInputClick}
      variant="outline"
      type='button'
      className={`${className?? ''} cursor-pointer [box-shadow:inset_0_0_0_0.4px_#9E9898CC]`}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <UploadIcon />
      Upload
    </Button>
  )
}

export { UploadButton }