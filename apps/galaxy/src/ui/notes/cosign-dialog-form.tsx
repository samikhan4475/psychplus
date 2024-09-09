'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import {
  FormContainer,
  FormFieldError,
  FormFieldLabel,
  FormSubmitButton,
  SelectInput,
} from '@/components'

const schema = z.object({
  provider: z.string().min(1, 'Required'),
})
type SchemaType = z.infer<typeof schema>

const CosignDialogForm = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      provider: '',
    },
  })
  const onSubmit: SubmitHandler<SchemaType> = (val) => {
    console.log(val)
  }
  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex direction={'column'} width={'100%'} gap={'6'}>
        <Flex direction={'column'} className={selectButtonClass}>
          <FormFieldLabel>Select Provider to Transfer</FormFieldLabel>
          <SelectInput field="provider" options={options} />
          <FormFieldError name="provider" />
        </Flex>
        <Flex justify={'end'}>
          <FormSubmitButton highContrast form={form} size={'1'}>
            Send To Co-Sign
          </FormSubmitButton>
        </Flex>
      </Flex>
    </FormContainer>
  )
}

const selectButtonClass =
  'w-full gap-[2px] [&__button]:border-pp-gray-2 [&__button]:w-full [&__button]:h-6 [&__button]:border [&__button]:border-solid [&__button]:!outline-none [&__button]:[box-shadow:none]'
const options = [...Array(8)].map((_, key) => ({
  value: `test ${key + 1}`,
  label: `Test ${key + 1}`,
}))
export { CosignDialogForm }
