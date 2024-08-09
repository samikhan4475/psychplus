import { ChangeEvent, useEffect, useRef } from 'react'
import { Flex } from '@radix-ui/themes'
import { usePubsub } from '@psychplus/utils/event'
import { CAPTURE_IMAGE_WIDGET, ENLARGE_IMAGE_WIDGET } from '../../widgets/src'
import { EventType } from '../../widgets/src/events'
import { cn } from './cn'
import { CameraIcon, ImageEditIcon, ViewIcon } from './icons'

interface ImageControlsProps {
  onFileChange: (file: File | undefined) => void
  previewSrc: string
  imageCaptureEvent: string
  className?: string
  disableControls?: boolean
}

const ImageControls = ({
  previewSrc,
  onFileChange,
  imageCaptureEvent,
  className,
  disableControls = false,
}: ImageControlsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { publish, subscribe } = usePubsub()

  useEffect(() => {
    if (onFileChange) return subscribe(imageCaptureEvent, onFileChange)
  }, [onFileChange, subscribe, imageCaptureEvent])

  // Handle image upload

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    onFileChange(selectedFile)
  }

  return (
    <Flex align="center" className={cn('gap-[14px]', className)}>
      <ViewIcon
        className="cursor-pointer"
        width={16.67}
        height={10}
        onClick={() =>
          publish<string>(
            `${ENLARGE_IMAGE_WIDGET}:${EventType.Opened}`,
            previewSrc,
          )
        }
      />
      <button
        onClick={handleFileInputClick}
        onKeyDown={(e) => e.stopPropagation()}
        type="button"
        className={cn({
          'cursor-pointer': !disableControls,
          'cursor-not-allowed': disableControls,
        })}
        disabled={disableControls}
      >
        <ImageEditIcon width={16} height={16} />
        <input
          type="file"
          ref={fileInputRef}
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
      </button>
      <button
        onClick={() => {
          publish<string>(
            `${CAPTURE_IMAGE_WIDGET}:${EventType.Opened}`,
            imageCaptureEvent,
          )
        }}
        type="button"
        disabled={disableControls}
      >
        <CameraIcon
          width={16}
          height={16}
          className={cn({
            'cursor-pointer': !disableControls,
            'cursor-not-allowed': disableControls,
          })}
        />
      </button>
    </Flex>
  )
}

export { ImageControls }
