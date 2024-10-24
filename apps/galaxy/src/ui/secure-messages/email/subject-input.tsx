import React, { useEffect } from 'react'
import { Box, Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError } from '@/components'
import { useStore } from '../store'
import { ActiveComponent } from '../types'
import { SendMessageSchemaType } from './send-message-schema'
import { SubjectTitle } from './subject-title'

const SubjectInput = () => {
  const form = useFormContext<SendMessageSchemaType>()
  const { previewSecureMessage, activeComponent } = useStore((state) => state)

  useEffect(() => {
    if (!previewSecureMessage) return

    const subject = previewSecureMessage?.secureMessage?.subject || ''
    switch (activeComponent) {
      case ActiveComponent.FORWARD:
        form.setValue('subject', `Fw: ${subject}`)
        break
      case ActiveComponent.DRAFT:
        form.setValue('subject', subject)
        break
      default:
        break
    }
  }, [activeComponent, previewSecureMessage, form])

  return (
    <Box className="!mt-4">
      <FormFieldError name="subject" />
      <Flex
        direction="row"
        className="border-pp-gray-4   h-[40px] w-[100%] border-b pb-[6px]"
        align={'center'}
      >
        <SubjectTitle />

        <TextField.Root
          size="3"
          type="text"
          className="rounded-lg h-[20px] w-full outline-none [box-shadow:none]"
          {...form.register('subject')}
        />
      </Flex>
    </Box>
  )
}

export { SubjectInput }
