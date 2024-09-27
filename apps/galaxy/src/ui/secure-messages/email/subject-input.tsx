import React, { useEffect } from 'react'
import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError } from '@/components'
import { SchemaType } from '../secure-messages-view'
import { useStore } from '../store'
import { ActiveComponent } from '../types'
import { SubjectTitle } from './subject-title'

const SubjectInput = ({
  activeComponent,
}: {
  activeComponent?: ActiveComponent
}) => {
  const form = useFormContext<SchemaType>()
  const { previewSecureMessage } = useStore((state) => state)

  useEffect(() => {
    if (activeComponent === ActiveComponent.FORWARD && previewSecureMessage) {
      form.setValue('subject', `Fw: ${previewSecureMessage.subject || ''}`)
    }
  }, [activeComponent, previewSecureMessage, form])

  return (
    <Flex
      direction="row"
      className="border-pp-gray-4 !mt-4  h-[40px] w-[100%] border-b pb-[6px]"
      align={'center'}
    >
      <SubjectTitle />

      <TextField.Root
        size="3"
        type="text"
        className="rounded-lg h-[20px] w-full outline-none [box-shadow:none]"
        {...form.register('subject')}
      />
      <FormFieldError name="Subject" />
    </Flex>
  )
}

export { SubjectInput }
