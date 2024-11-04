'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore } from './store'

interface ResetButtonProps {
  patientId: string
}
const ResetButton = ({ patientId }: ResetButtonProps) => {
  const form = useFormContext()
  const { fetchBillingHistory } = useStore((state) => ({
    fetchBillingHistory: state.fetchBillingHistory,
  }))
  const handleReset = () => {
    form.reset({
      claimNumber: '',
      fromDate: null,
      endDate: null,
      patientInsurancePayerId: '',
      locationId: '',
      patientId: patientId,
    })
    fetchBillingHistory({ patientId }, 1, true)
  }
  return (
    <Button
      size="1"
      color="gray"
      className="text-black"
      variant="outline"
      type="button"
      onClick={handleReset}
    >
      Clear
    </Button>
  )
}

export { ResetButton }
