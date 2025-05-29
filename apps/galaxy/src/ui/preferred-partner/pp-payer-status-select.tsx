'use client'

import { useFormContext } from 'react-hook-form'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { SchemaType } from './preferred-partner-filter-form'

const excludedOptions = [
  'CoPay',
  'CoInsurance',
  'CoPayAndCoInsurance',
  'OutstandingBalance',
  'PaymentPlan',
  'PlusMembership',
]

const labelMapping: Record<string, string> = {
  Ins: 'Insurance ',
  SelfPay: 'Self Insurance',
}

const PPPayerStatusSelect = () => {
  const form = useFormContext<SchemaType>()

  const paymentTypes = useCodesetOptions(CODESETS.PaymentType)
    ?.filter((opt) => !excludedOptions.includes(opt.value))
    .map((option) => ({
      ...option,
      label: labelMapping[option.label] ?? option.label,
    }))

  const payerStatus = form.watch('payerStatusList')?.[0]

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">PP Payer Status</FormFieldLabel>
      <DropdownSelect
        fieldValue={payerStatus}
        className="max-w-full"
        field="payerStatusList[0]"
        options={paymentTypes}
      />
    </FormFieldContainer>
  )
}

export { PPPayerStatusSelect }
