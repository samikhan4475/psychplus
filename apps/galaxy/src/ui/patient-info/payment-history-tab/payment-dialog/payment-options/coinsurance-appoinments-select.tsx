'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  MultiSelectField,
} from '@/components'
import { useAppointmentOptions } from '../hooks'
import { PaymentDetailSchemaType } from '../payment-schema'
import { useStore } from '../store'
import { AppointmentOptionType } from '../types'
import { twoDecimal } from '../utils'

interface CoinsuranceAppoinmentProps {
  disabled?: boolean
  patientId: string
}
const CoinsuranceAppoinmentSelect = ({
  patientId,
  disabled = true,
}: CoinsuranceAppoinmentProps) => {
  const form = useFormContext<PaymentDetailSchemaType>()

  const coInsuranceMap = useStore((state) => state.coInsuranceMap)

  const options = useAppointmentOptions({
    patientId,
    paymentType: AppointmentOptionType.CoInsurance,
  })

  const handleChange = (selectedIds: string[]) => {
    const totalCoInsurance = selectedIds.reduce(
      (sum, id) => sum + (coInsuranceMap[id] || 0),
      0,
    )

    form.setValue('coInsApp', selectedIds)
    form.setValue(
      'coInsAmount',
      totalCoInsurance ? twoDecimal(totalCoInsurance) : '',
    )
    form.trigger(['coInsApp', 'coInsAmount'])
  }

  return (
    <FormFieldContainer className="w-[156px]">
      <MultiSelectField
        options={options ?? []}
        menuClassName="w-[156px]"
        defaultValues={form.watch('coInsApp') as string[]}
        onChange={handleChange}
        disabled={disabled}
      />
      <FormFieldError name="coInsApp" />
    </FormFieldContainer>
  )
}

export { CoinsuranceAppoinmentSelect }
