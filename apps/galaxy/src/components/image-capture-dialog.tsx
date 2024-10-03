'use client'

import { useRef, useState } from 'react'
import { Box, Button, Dialog, Flex } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import { CameraIcon } from './icons'

type CameraDialogProps = {
  onCapture: (file: File) => void
}

const ImageCaptureDialog = ({ onCapture }: CameraDialogProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)

  const enableCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    })

    if (videoRef.current) {
      videoRef.current.srcObject = stream
    }
    setCameraStream(stream)
  }

  const disableCamera = async () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop())
      setCameraStream(null)
    }
  }

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      canvas
        .getContext('2d')
        ?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'image.png')
          onCapture(file)
        }
      })

      disableCamera()
    }
  }

  return (
    <Dialog.Root onOpenChange={disableCamera}>
      <Dialog.Trigger onClick={enableCamera}>
        <CameraIcon className="cursor-pointer" />
      </Dialog.Trigger>
      <Dialog.Content className="relative font-bold">
        <Dialog.Close className="absolute right-3 top-3 cursor-pointer">
          <Flex
            align="center"
            justify="center"
            className="rounded-full h-[35px] w-[35px] text-gray-11 transition-colors hover:bg-gray-3"
          >
            <XIcon width={20} height={20} strokeWidth={1.5} />
          </Flex>
        </Dialog.Close>
        <Box className="min-h-36 mb-4">
          <video
            className="mx-auto pt-7"
            ref={videoRef}
            width="500"
            height="200"
            autoPlay
            muted
          />
        </Box>
        <Dialog.Close>
          <Flex justify="end">
            <Button type="button" highContrast onClick={handleCapture}>
              Capture
            </Button>
          </Flex>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ImageCaptureDialog }
