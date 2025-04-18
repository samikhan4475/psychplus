'use client'

import React from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { SchemaType } from './schema'

const VideoCallLinkInput = () => {
  const form = useFormContext<SchemaType>()
  const isVirtualRoomLink = form.watch('isVirtualRoomLink')

  if (!isVirtualRoomLink) return null
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Video Call Link</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('virtualRoomLink')}
      />
      <FormFieldError name="virtualRoomLink" />
    </FormFieldContainer>
  )
}

export { VideoCallLinkInput }
