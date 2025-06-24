'use client'

import { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, Button, Dialog, Flex, Text, Tooltip } from '@radix-ui/themes'
import Webcam from 'react-webcam'
import { CloseDialogIcon } from '@/components-v2'
import CameraIcon from '@/components-v2/icons/camera-icon'
import { updateProfileImage } from '@/features/account/profile/ui/account-profile-view/avatar/api'

interface PreCheckinWebcamImageUploadProps {
  setAvatarKey: (value: number | ((prev: number) => number)) => void
}

const PreCheckinWebcamImageUpload = ({
  setAvatarKey,
}: PreCheckinWebcamImageUploadProps) => {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(false)
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const webcamRef = useRef<Webcam>(null)

  const [open, setOpen] = useState(false)

  const router = useRouter()

  const capture = useCallback(() => {
    if (!webcamRef.current) {
      return
    }

    setImgSrc(webcamRef.current.getScreenshot())
  }, [webcamRef])

  const handleUpload = async () => {
    if (!imgSrc) return
    setUploadError(false)
    setUploading(true)

    const formData = new FormData()

    const res = await fetch(imgSrc)
    const blob = await res.blob()
    const file = new File([blob], 'avatar.jpeg', { type: 'image/jpeg' })

    formData.append('file', file)

    const response = await updateProfileImage(formData)

    setUploading(false)

    if (response.ok) {
      setOpen(false)
      router.refresh()
      setTimeout(() => setAvatarKey((prev) => prev + 1), 1000)
    } else {
      setUploadError(true)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <button>
          <Tooltip content="Take picture" delayDuration={250}>
            <Flex align="center" justify="center" className="cursor-pointer">
              <CameraIcon />
            </Flex>
          </Tooltip>
        </button>
      </Dialog.Trigger>
      <Dialog.Content className="relative flex h-[425px] max-w-[450px] flex-col">
        <CloseDialogIcon />
        <Dialog.Title>
          <Text weight="medium" size="4" className="font-sans">
            Take your picture
          </Text>
        </Dialog.Title>
        <Flex
          align="center"
          justify="center"
          py="6"
          className="relative flex-1"
        >
          {imgSrc ? (
            <Flex align="center" direction="column">
              <Avatar
                src={imgSrc}
                size="9"
                fallback=""
                className="h-[200px] w-[200px]"
              />
              {uploadError ? (
                <Text size="3" mt="4" className="text-tomato-11">
                  There was a problem uploading your picture.
                </Text>
              ) : null}
            </Flex>
          ) : (
            <Flex justify="center" className="overflow-hidden rounded-3">
              <Webcam
                className="w-full max-w-[300px]"
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                mirrored
              />
            </Flex>
          )}
        </Flex>
        <Flex gap="3" justify="end" wrap={{ initial: 'wrap', md: 'nowrap' }}>
          {imgSrc ? (
            <Button
              variant="soft"
              highContrast
              onClick={() => setImgSrc(null)}
              disabled={uploading}
            >
              Retake
            </Button>
          ) : (
            <Button highContrast onClick={capture} disabled={uploading}>
              Capture
            </Button>
          )}
          {imgSrc && (
            <Button onClick={handleUpload} highContrast disabled={uploading}>
              Use this picture
            </Button>
          )}
          <Dialog.Close>
            <Button
              color="gray"
              variant="outline"
              onClick={() => setImgSrc(null)}
              highContrast
            >
              Cancel
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PreCheckinWebcamImageUpload }
