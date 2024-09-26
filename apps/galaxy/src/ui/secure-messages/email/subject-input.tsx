import React from 'react'
import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError } from '@/components'
import { SchemaType } from '../secure-messages-view'
import { SubjectTitle } from './subject-title'

const SubjectInput = () => {
  const form = useFormContext<SchemaType>()

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
