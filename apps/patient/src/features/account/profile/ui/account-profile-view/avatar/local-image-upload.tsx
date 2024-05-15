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
import { ImageIcon, RefreshCwIcon } from 'lucide-react'
import { CloseDialogIcon } from '@/components-v2'
import { updateProfileImage } from './api'

const LocalImageUpload = () => {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(false)
  const [imgSrc, setImgSrc] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setImgSrc(event.target.files[0])
      setPreviewImage(URL.createObjectURL(event.target.files[0]))
    }
  }

  const handleUpload = async () => {
    if (imgSrc) {
      setUploadError(false)
      setUploading(true)

      const formData = new FormData()
      formData.append('file', imgSrc)

      const response = await updateProfileImage(formData)
      setUploading(false)

      if (response.ok) {
        window.location.reload()
      } else {
        setUploadError(true)
      }
    }
  }

  const clearStates = () => {
    setImgSrc(null)
    setPreviewImage(null)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button>
          <Tooltip content="Upload picture" delayDuration={250}>
            <Flex
              align="center"
              justify="center"
              className="rounded-full text-white h-[28px] w-[28px] cursor-pointer bg-accent-12"
            >
              <ImageIcon strokeWidth={1.5} className="h-[18px] w-[18px]" />
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
              <>
                <Box position="relative">
                  <Avatar
                    src={previewImage}
                    size="9"
                    alt=""
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
                    >
                      <RefreshCwIcon
                        width={18}
                        height={18}
                        strokeWidth={1.5}
                        onClick={clearStates}
                      />
                    </Flex>
                  </Tooltip>
                </Box>
                {uploadError ? (
                  <Text size="3" mt="4" className="text-tomato-11">
                    There was a problem uploading your picture.
                  </Text>
                ) : null}
              </>
            ) : (
              <>
                <Button
                  size="3"
                  highContrast
                  asChild
                  className="cursor-pointer"
                >
                  <label htmlFor="file">Choose a file</label>
                </Button>
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </>
            )}
          </Flex>
          <Flex gap="3" justify="end">
            {imgSrc && (
              <Button highContrast onClick={handleUpload} disabled={uploading}>
                Use this picture
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

export { LocalImageUpload }
