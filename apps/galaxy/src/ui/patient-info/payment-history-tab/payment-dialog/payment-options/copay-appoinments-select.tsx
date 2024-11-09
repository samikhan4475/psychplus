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

interface CopayAppoinmentProps {
  disabled?: boolean
  patientId: string
}

const CopayAppoinmentSelect = ({
  disabled,
  patientId,
}: CopayAppoinmentProps) => {
  const form = useFormContext<PaymentDetailSchemaType>()

  const coPayMap = useStore((state) => state.coPayMap)

  const options = useAppointmentOptions({
    patientId,
    paymentType: AppointmentOptionType.CoPay,
  })

  const handleChange = (selectedIds: string[]) => {
    const totalCoPay = selectedIds.reduce(
      (sum, id) => sum + (coPayMap[id] ?? 0),
      0,
    )

    form.setValue('coPayApp', selectedIds)
    form.setValue('coPayAmount', totalCoPay ? twoDecimal(totalCoPay) : '')
    form.trigger(['coPayApp', 'coPayAmount'])
  }

  return (
    <FormFieldContainer className="w-[156px]">
      <MultiSelectField
        options={options ?? []}
        menuClassName="w-[156px]"
        defaultValues={form.watch('coPayApp')}
        onChange={handleChange}
        disabled={disabled}
      />
      <FormFieldError name="coPayApp" />
    </FormFieldContainer>
  )
}

export { CopayAppoinmentSelect }
