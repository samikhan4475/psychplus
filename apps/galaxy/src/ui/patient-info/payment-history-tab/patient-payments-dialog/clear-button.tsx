'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './filter-form'
import { useStore } from './store'

interface ClearButtonProps {
  patientId: string
}

const ClearButton = ({ patientId }: ClearButtonProps) => {
  const { fetchPatientPayments } = useStore((state) => ({
    fetchPatientPayments: state.fetchPatientPayments,
  }))
  const form = useFormContext<SchemaType>()
  const handleClearForm = () => {
    fetchPatientPayments(patientId)
    form.reset()
  }
  return (
    <Button
      color="gray"
      variant="outline"
      size="1"
      className="text-black"
      type="button"
      onClick={handleClearForm}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
