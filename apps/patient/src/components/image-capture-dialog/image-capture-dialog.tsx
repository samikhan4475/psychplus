import { useRef, useState } from 'react'
import { CameraIcon, Cross2Icon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import { Dialog } from '@psychplus/ui/dialog'

type CameraDialogProps = {
  onCapture: (imageURL: string) => void
}

const ImageCaptureDialog: React.FC<CameraDialogProps> = ({ onCapture }) => {
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
      const imageURL = canvas.toDataURL('image/png')

      onCapture(imageURL)
      disableCamera()
    }
  }

  return (
    <Dialog.Root onOpenChange={disableCamera}>
      <Dialog.Trigger onClick={enableCamera}>
        <Button
          radius="full"
          variant="solid"
          className="absolute bottom-4 right-7 z-20 h-7 w-7 -translate-x-1/2 translate-y-1/2 outline-none"
        >
          <Flex>
            <CameraIcon color="white" height={16} width={16} />
          </Flex>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative px-0 font-bold">
        <Flex
          align="center"
          justify="between"
          mb="5"
          pb="4"
          px="5"
          className="border-b border-gray-5"
        >
          <Dialog.Close>
            <Button size="3" onClick={handleCapture} className="outline-none">
              Capture
            </Button>
          </Dialog.Close>

          <Dialog.Close>
            <Cross2Icon onClick={disableCamera} />
          </Dialog.Close>
        </Flex>
        <Flex p="8">
          <video ref={videoRef} autoPlay height="480px" width="480px" />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ImageCaptureDialog }
