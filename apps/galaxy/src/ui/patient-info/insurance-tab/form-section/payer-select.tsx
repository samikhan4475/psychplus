'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { InsurancePayer } from '../types'

interface PayerSelectProps {
  insurancePayers: InsurancePayer[]
}

const PayerSelect = ({ insurancePayers }: PayerSelectProps) => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Payer
      </FormFieldLabel>
      <SelectInput
        field="payerName"
        buttonClassName="border-pp-gray-2 w-full h-7 border border-solid !outline-none [box-shadow:none]"
        options={
          insurancePayers?.map((item) => ({
            label: item.name,
            value: item.name,
          })) ?? []
        }
        placeholder="Select payer"
      />
      <FormFieldError name="payerName" />
    </FormFieldContainer>
  )
}

const options = [
  {
    label: 'Test',
    value: 'test',
  },
  {
    label: 'Ambetter',
    value: 'ambetter',
  },
]
export { PayerSelect }
