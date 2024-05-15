'use client'

import { Select } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components-v2'
import type { InsurancePayer } from '../../types'
import { type SchemaType } from './insurance-form'

interface PayerSelectProps {
  payers: InsurancePayer[]
}

const PayerSelect = ({ payers }: PayerSelectProps) => {
  const form = useFormContext<SchemaType>()

  const items = payers.map((payer) => (
    <Select.Item key={payer.id} value={payer.name}>
      {payer.name}
    </Select.Item>
  ))

  return (
    <FormFieldContainer>
      <FormFieldLabel>Payer</FormFieldLabel>
      <Controller
        name={'payerName'}
        control={form.control}
        render={({ field }) => {
          const { ref, ...rest } = field
          return (
            <Select.Root
              onValueChange={(value) => {
                field.onChange(value)
                form.setValue('insurancePlanId', '')
              }}
              {...rest}
            >
              <Select.Trigger placeholder={'Select Payer'} />
              <Select.Content position="popper" align="center" highContrast>
                {items}
              </Select.Content>
            </Select.Root>
          )
        }}
      />
      <FormFieldError name="payer" />
    </FormFieldContainer>
  )
}

export { PayerSelect }
