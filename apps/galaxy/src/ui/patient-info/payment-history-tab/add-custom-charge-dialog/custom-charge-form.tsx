'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import {
  getCalendarDate,
  getCalendarDateLabel,
  sanitizeFormData,
} from '@/utils'
import { PatientTransaction } from '../types'
import { createPatientCustomChargeAction } from './actions'
import { AmountInput } from './amount-input'
import { BalanceBlock } from './balance-block'
import { ChargeSelect } from './charge-select'
import { CoInsBlock } from './co-ins-block'
import { CoPayBlock } from './co-pay-block'
import { DatePickerField } from './date-picker-input'
import { DescriptionInput } from './description-input'
import { SaveChargesButton } from './save-charges-button'
import { chargeSchema, CustomChargeSchemaType } from './schema'
import { TimeSelect } from './time-select'
import { UnAppliedBalanceInput } from './un-applied-balance-input'

interface CustomChargeFormProps {
  patientId: string
  onClose: () => void
  unappliedAmount?: string
  transaction?: PatientTransaction
}

const CustomChargeForm = ({
  patientId,
  onClose,
  unappliedAmount,
  transaction,
}: CustomChargeFormProps) => {
  const form = useForm<CustomChargeSchemaType>({
    resolver: zodResolver(chargeSchema),
    reValidateMode: 'onChange',
    shouldUnregister: true,
    defaultValues: {
      type: transaction?.type ?? '',
      description: transaction?.description ?? '',
      unappliedBalance: unappliedAmount,
      chargeDate: transaction?.chargeDate
        ? getCalendarDate(transaction?.chargeDate)
        : undefined,
      chargeTime: transaction?.chargeTime ?? '',
      balanceDue: transaction?.balanceDue
        ? String(transaction?.balanceDue)
        : '',
    },
  })

  const onSubmit: SubmitHandler<CustomChargeSchemaType> = async (data) => {
    const sanitizedData = sanitizeFormData({
      ...data,
      chargeDate: getCalendarDateLabel(data.chargeDate),
    })

    const response = await createPatientCustomChargeAction(
      patientId,
      sanitizedData,
    )
    if (response.state === 'error') {
      toast.error(response.error ?? 'Error while saving')
      return
    }

    toast.success('Charge created successfully!')
    onClose()
  }
  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="gap-3 rounded-2 border border-gray-3 px-2 py-2"
    >
      <Grid columns="2" gap="3">
        <ChargeSelect />
        <DescriptionInput />
      </Grid>
      <Grid columns="4" gap="3">
        <UnAppliedBalanceInput />
        <DatePickerField />
        <TimeSelect />
        <AmountInput />
      </Grid>
      {transaction && transaction.type === 'Visit' && (
        <Grid columns="3" className="overflow-hidden rounded-2 shadow-2">
          <CoPayBlock />
          <CoInsBlock />
          <BalanceBlock />
        </Grid>
      )}

      <SaveChargesButton />
    </FormContainer>
  )
}

export { CustomChargeForm }
