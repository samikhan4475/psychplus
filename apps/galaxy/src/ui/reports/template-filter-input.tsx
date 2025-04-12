'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

type TemplateInputProps = {
  title: string
  name: string
}

const TemplateFilterInput = ({ title, name }: TemplateInputProps) => {
  const { register } = useFormContext()

  return (
    <FormFieldContainer className="w-full flex-row items-center justify-start gap-1">
      <FormFieldLabel className="!text-1" required>
        {title}
      </FormFieldLabel>
      <Flex direction="column">
        <TextField.Root size="1" placeholder={title} {...register(name)} />
        <FormFieldError name={name} />
      </Flex>
    </FormFieldContainer>
  )
}

export { TemplateFilterInput }
