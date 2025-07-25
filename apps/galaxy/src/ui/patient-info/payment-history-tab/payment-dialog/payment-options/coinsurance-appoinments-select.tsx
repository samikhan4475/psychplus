'use client'

import { useEffect } from 'react'
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
  appointmentId?: number
}
const CoinsuranceAppoinmentSelect = ({
  patientId,
  appointmentId,
  disabled = true,
}: CoinsuranceAppoinmentProps) => {
  const form = useFormContext<PaymentDetailSchemaType>()

  const coInsuranceMap = useStore((state) => state.coInsuranceMap)

  const amount = appointmentId ? coInsuranceMap[appointmentId] : undefined

  const options = useAppointmentOptions({
    patientId,
    paymentType: AppointmentOptionType.CoInsurance,
  })

  useEffect(() => {
    if (!appointmentId) return
    if (amount) {
      form.setValue('coInsAmount', twoDecimal(amount))
    }
  }, [appointmentId, amount])

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
        defaultValues={twoDecimal(amount ?? 0)=== '0.00' ? [] : form.watch('coInsApp') as string[]}
        onChange={handleChange}
        disabled={disabled}
      />
      <FormFieldError name="coInsApp" />
    </FormFieldContainer>
  )
}

export { CoinsuranceAppoinmentSelect }
