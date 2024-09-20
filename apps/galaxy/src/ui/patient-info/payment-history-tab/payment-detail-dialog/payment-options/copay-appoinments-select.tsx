'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  MultiSelectField,
} from '@/components'
import { PaymentDetailSchema } from '../payment-detail-schema'

const options = [
  {
    label: 'test1',
    value: 'test1',
  },
  {
    label: 'test2',
    value: 'test2',
  },
  {
    label: 'test3',
    value: 'test3',
  },
  {
    label: 'test4',
    value: 'test4',
  },
]

interface CopayAppoinmentProps {
  disabled?: boolean
}

const CopayAppoinmentSelect = ({ disabled }: CopayAppoinmentProps) => {
  const form = useFormContext<PaymentDetailSchema>()

  return (
    <FormFieldContainer className="w-[156px]">
      <MultiSelectField
        options={options}
        menuClassName="w-[156px]"
        defaultValues={form.watch('coPayApp') as string[]}
        onChange={(vals) => {
          form.setValue('coPayApp', vals)
          form.trigger('coPayApp')
        }}
        disabled={disabled}
      />
      <FormFieldError name="coPayApp" />
    </FormFieldContainer>
  )
}

export { CopayAppoinmentSelect }
