'use client'

import React, { useRef } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button, Flex, IconButton, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { UploadIcon } from '@/components/icons'
import {
  STAFF_BIO_VIDEO_MAX_SIZE,
  STAFF_BIO_VIDEO_SIZE_ERROR,
} from '../../constants'
import { isValidVideoSize } from '../../utils'
import { SchemaType } from './schema'

const BioVideoField = () => {
  const form = useFormContext<SchemaType>()
  const hasBioVideo = form.watch('hasBioVideo')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleRemoveBioVideo = () => {
    form.setValue('bioVideo', null)
    form.setValue('hasBioVideo', false)
  }
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleBioVideoChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e?.target.files?.[0]
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    const isValid = isValidVideoSize(file, STAFF_BIO_VIDEO_MAX_SIZE)
    if (!isValid) {
      return toast.error(STAFF_BIO_VIDEO_SIZE_ERROR)
    }
    if (file) {
      form.setValue('bioVideo', file)
      form.setValue('hasBioVideo', true)
    }
  }

  return (
    <FormFieldContainer>
      <FormFieldLabel>Bio Video</FormFieldLabel>
      {hasBioVideo ? (
        <Flex
          className="border-pp-gray-2 h-6 w-full rounded-2 border border-solid px-2 !outline-none [box-shadow:none]"
          align="center"
          justify="between"
        >
          <Text size="1">bio_video.mp4</Text>
          <IconButton
            variant="ghost"
            color="gray"
            onClick={handleRemoveBioVideo}
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
          className="text-black bg-white flex h-[24px] w-full cursor-pointer items-center justify-center px-3 py-2"
        >
          <Text className="text-pp-black-1 flex items-center justify-center gap-1 text-[12px] font-regular">
            <UploadIcon /> Upload
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
