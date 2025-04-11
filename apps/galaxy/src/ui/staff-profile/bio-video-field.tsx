import React, { useRef, useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button, Flex, IconButton, Spinner, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { UploadIcon } from '@/components/icons'
import { deleteStaffVideoAction } from './actions/delete-staff-video'
import { SchemaType } from './schema'
import { handleUploadBioVideo } from './utils'

const BioVideoField = () => {
  const [isBioVideoDeleting, setIsBioVideoDeleting] = useState(false)
  const [isVideoUploading, setIsVideoUploading] = useState(false)
  const [isVideoUploaded, setIsVideoUploaded] = useState(false)
  const form = useFormContext<SchemaType>()
  const staffId = form.watch('staffId')
  const hasBioVideo = form.watch('hasBioVideo')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const deleteBioVideo = async () => {
    if (staffId) {
      setIsBioVideoDeleting(true)
      const result = await deleteStaffVideoAction(staffId)
      if (result.state === 'error') {
        toast.error(result.error ?? 'Failed to delete the record')
      } else if (result.state === 'success') {
        toast.success('The record has been deleted successfully')
        form.setValue('hasBioVideo', false)
        setIsVideoUploaded(false)
      }
      setIsBioVideoDeleting(false)
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleBioVideoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsVideoUploading(true)
      const uploadSuccess = await handleUploadBioVideo(file, staffId)
      if (!uploadSuccess) {
        return setIsVideoUploading(false)
      }
      form.setValue('hasBioVideo', true)
      form.trigger('hasBioVideo')
      setIsVideoUploading(false)
      setIsVideoUploaded(true)
    }
  }

  return (
    <FormFieldContainer>
      <FormFieldLabel>Bio Video</FormFieldLabel>
      {hasBioVideo || isVideoUploaded ? (
        <Flex
          className="border-pp-gray-2 h-6 w-full rounded-2 border border-solid px-2 !outline-none [box-shadow:none]"
          align="center"
          justify="between"
        >
          <Text size="1">bio_video.mp4</Text>
          <IconButton
            variant="ghost"
            color="gray"
            onClick={deleteBioVideo}
            disabled={isBioVideoDeleting}
          >
            <Cross1Icon width="8" height="8" />
          </IconButton>
        </Flex>
      ) : (
        <Button
          onClick={handleButtonClick}
          variant="outline"
          type="button"
          color="gray"
          disabled={isVideoUploading}
          className="text-black bg-white flex h-[24px] w-full cursor-pointer items-center justify-center px-3 py-2"
        >
          <Text className="text-pp-black-1 flex items-center justify-center gap-1 text-[12px] font-regular">
            {!isVideoUploading ? (
              <>
                <UploadIcon /> Upload
              </>
            ) : (
              <>
                <Spinner /> Uploading
              </>
            )}
          </Text>
        </Button>
      )}
      <FormFieldError name="hasBioVideo" />

      <input
        type="file"
        accept=".mp4"
        ref={fileInputRef}
        className="hidden"
        onChange={handleBioVideoChange}
      />
    </FormFieldContainer>
  )
}

export { BioVideoField }
