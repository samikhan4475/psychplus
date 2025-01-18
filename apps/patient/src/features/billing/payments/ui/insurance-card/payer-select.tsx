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
  disabled?: boolean
}

const PayerSelect = ({ payers, disabled = false }: PayerSelectProps) => {
  const form = useFormContext<SchemaType>()

  const items = payers.map((payer) => (
    <Select.Item key={payer.id} value={payer.name}>
      {payer.name}
    </Select.Item>
  ))

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Payer</FormFieldLabel>
      <Controller
        name={'payerName'}
        control={form.control}
        render={({ field }) => {
          const { ref, ...rest } = field

          const triggerProps = {
            placeholder: 'Select payer',
          }

          return (
            <Select.Root
              disabled={disabled}
              onValueChange={(value) => {
                field.onChange(value)
                form.setValue('insurancePlanId', '')
              }}
              {...rest}
            >
              <Select.Trigger
                {...triggerProps}
                variant="soft"
                className="bg-[white] outline outline-1 outline-gray-7"
              />
              <Select.Content position="popper" align="center" highContrast>
                {items}
              </Select.Content>
            </Select.Root>
          )
        }}
      />
      <FormFieldError name="payerName" />
    </FormFieldContainer>
  )
}

export { PayerSelect }
