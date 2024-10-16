'use client'

import { useEffect, useState } from 'react'
import { useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import type { InsurancePayer, InsurancePlan } from '@/types'
import { getInsurancePayerPlans } from '../actions'

const InsurancePlanSelect = ({
  payers,
  selectedInsuranceId,
}: {
  payers: InsurancePayer[]
  selectedInsuranceId?: string
}) => {
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
        toast.error(res.error)
        setPlans([])
      } else {
        setPlans(res.data.plans)
      }
      setLoading(false)
    })
  }, [payerName, payers])

  const options = plans?.map((plan) => ({
    label: plan.name,
    value: plan.id,
  }))

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Insurance Plan</FormFieldLabel>

      <SelectInput
        field="insurancePlanId"
        placeholder="Select Plan"
        disabled={loading || !plans || !!selectedInsuranceId}
        options={options}
        buttonClassName="border-pp-gray-2 w-full h-7 border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="insurancePlanId" />
    </FormFieldContainer>
  )
}

export { InsurancePlanSelect }
