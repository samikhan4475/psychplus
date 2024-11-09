'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CreditCard } from '@/types'
import { PaymentDetailSchemaType } from '../payment-schema'
import { PaymentMethod } from '../types'
import { maskCardNumber } from '../utils'

interface SelectMethodProps {
  primaryCardDetails?: CreditCard
}

const SelectMethod = ({ primaryCardDetails }: SelectMethodProps) => {
  const { setValue } = useFormContext<PaymentDetailSchemaType>()
  const handleChange = (value: PaymentMethod) => {
    const paymentDescription =
      value === PaymentMethod.CreditCard && primaryCardDetails
        ? maskCardNumber(primaryCardDetails.numberLastFour)
        : ''

    setValue('paymentDescription', paymentDescription, { shouldValidate: true })
    setValue('paymentMethod', value)
  }

  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1 !font-medium">
        Select Payment Method
      </FormFieldLabel>
      <SelectInput
        size="1"
        placeholder="Select Type"
        field="paymentMethod"
        onValueChange={handleChange}
        buttonClassName="border-pp-gray-2 h-6 w-[145px] border border-solid !outline-none [box-shadow:none]"
        options={options}
      />

      <FormFieldError name="paymentMethod" />
    </FormFieldContainer>
  )
}

const options = [
  {
    label: 'Credit Card',
    value: 'Credit Card',
  },
  {
    label: 'Cheque',
    value: 'Cheque',
  },
  {
    label: 'Cash',
    value: 'Cash',
  },
  {
    label: 'CMD',
    value: 'CMD',
  },
]
export { SelectMethod }
