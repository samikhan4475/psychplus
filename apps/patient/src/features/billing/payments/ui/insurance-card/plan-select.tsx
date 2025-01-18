'use client'

import { useEffect, useState } from 'react'
import { Select } from '@radix-ui/themes'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components-v2'
import { getInsurancePayerPlans } from '../../actions'
import type { InsurancePayer, InsurancePlan } from '../../types'
import { type SchemaType } from './insurance-form'

const PlanSelect = ({
  payers,
  disabled = false,
}: {
  payers: InsurancePayer[]
  disabled?: boolean
}) => {
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState(false)
  const [plans, setPlans] = useState<InsurancePlan[]>()
  const payerName = useWatch({ name: 'payerName' })

  useEffect(() => {
    if (!payerName) {
      return
    }

    const payerId = payers.find((payer) => payer.name === payerName)?.id
    if (!payerId) return

    setLoading(true)
    getInsurancePayerPlans(payerId).then((res) => {
      if (res.state === 'error') {
        alert(res.error)
      } else {
        setPlans(res.data.plans)
      }

      setLoading(false)
    })
  }, [payerName, payers])

  const items = plans?.map((plan) => (
    <Select.Item key={plan.id} value={plan.id}>
      {plan.name}
    </Select.Item>
  ))

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Insurance Plan</FormFieldLabel>
      <Controller
        name="insurancePlanId"
        control={form.control}
        render={({ field }) => {
          const { ref, ...rest } = field

          const triggerProps = {
            placeholder: 'Select plan',
          }

          return (
            <Select.Root
              disabled={loading || !plans || disabled}
              onValueChange={field.onChange}
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
      <FormFieldError name="insurancePlanId" />
    </FormFieldContainer>
  )
}

export { PlanSelect }
