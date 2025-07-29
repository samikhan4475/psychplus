'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { InsurancePayer } from '@/types'
import { useFormContext } from 'react-hook-form'

interface PayerSelectProps {
  insurancePayers: InsurancePayer[]
  selectedInsuranceId?: string
}

const PayerSelect = ({ insurancePayers, selectedInsuranceId }: PayerSelectProps) => {
  const { setValue } = useFormContext();

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
        onValueChange={(value) => {
          setValue('payerName', value);
          setValue('insurancePlanId', '');
        }}
        placeholder="Select payer"
        disabled={!!selectedInsuranceId}
        itemClassName='max-w-[200px] break-words whitespace-normal !py-1 h-fit'
      />
      <FormFieldError name="payerName" />
    </FormFieldContainer>
  )
}

export { PayerSelect }
