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
  isRequired: boolean
}

const TemplateFilterInput = ({
  title,
  name,
  isRequired,
}: TemplateInputProps) => {
  const { register } = useFormContext()
  const isScheduleReport = name?.includes('scheduleParameterValue') ?? false
  return (
    <FormFieldContainer
      className={`w-full gap-1 ${
        !isScheduleReport ? 'flex-row items-center justify-start' : ''
      }`}
    >
      <FormFieldLabel className="!text-1" required={isRequired}>
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
