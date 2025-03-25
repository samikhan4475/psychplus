'use client'

import { ChangeEvent, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  Flex,
  Text,
  Tooltip,
} from '@radix-ui/themes'
import { RefreshCwIcon } from 'lucide-react'
import { CloseDialogIcon } from '@/components-v2'
import CameraEditIcon from '@/components-v2/icons/camera-edit-icon'
import { updateProfileImage } from '@/features/account/profile/ui/account-profile-view/avatar/api'
import { useToast } from '@/providers'
import { useRouter } from 'next/navigation'

const PreCheckinImageUpload = ({ setAvatarKey }: { setAvatarKey:(value: number | ((prev: number) => number)) => void  }) => {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [open, setOpen] = useState(false)

  const router = useRouter()

  const { toast } = useToast()

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    setUploadError(false)

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await updateProfileImage(formData)
      if (response.ok) {
        setOpen(false)
        router.refresh()
        setTimeout(() => setAvatarKey((prev) => prev + 1), 1000)
      }
    } catch (error) {
      setUploadError(true)
      toast({
        title: 'Failed to upload profile image',
        type: 'error',
      })
    } finally {
      setUploading(false)
    }
  }

  const clearStates = () => {
    setSelectedFile(null)
    setPreviewImage(null)
    setUploadError(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <button>
          <Tooltip content="Upload picture" delayDuration={250}>
            <Flex align="center" justify="center" className="cursor-pointer">
              <CameraEditIcon />
            </Flex>
          </Tooltip>
        </button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[450px]">
        <CloseDialogIcon />
        <Flex direction="column">
          <Dialog.Title>
            <Text weight="medium" size="4" className="font-sans">
              Upload a profile picture
            </Text>
          </Dialog.Title>
          <Flex direction="column" justify="center" align="center" py="6">
            {previewImage ? (
              <Box position="relative">
                <Avatar
                  src={previewImage}
                  size="9"
                  alt="Profile preview"
                  fallback=""
                  highContrast
                  className="border border-accent-12"
                />
                <Tooltip content="Choose another file" delayDuration={250}>
                  <Flex
                    align="center"
                    justify="center"
                    position="absolute"
                    className="rounded-full text-white bottom-0 right-[25px] h-[30px] w-[30px] cursor-pointer bg-accent-12"
                    onClick={clearStates}
                  >
                    <RefreshCwIcon width={18} height={18} strokeWidth={1.5} />
                  </Flex>
                </Tooltip>
              </Box>
            ) : (
              <Button size="3" highContrast asChild className="cursor-pointer">
                <label htmlFor="file">Choose a file</label>
              </Button>
            )}
            <input
              type="file"
              id="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            {uploadError && (
              <Text size="3" mt="4" className="text-tomato-11">
                There was a problem uploading your picture.
              </Text>
            )}
          </Flex>
          <Flex gap="3" justify="end">
            {selectedFile && (
              <Button highContrast onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Use this picture'}
              </Button>
            )}
            <Dialog.Close>
              <Button
                color="gray"
                variant="outline"
                onClick={clearStates}
                highContrast
              >
                Cancel
              </Button>
            </Dialog.Close>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PreCheckinImageUpload }
