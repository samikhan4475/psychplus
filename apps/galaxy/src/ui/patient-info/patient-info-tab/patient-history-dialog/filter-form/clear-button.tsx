import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore } from '../store'
import { SchemaType } from './filter-form'

interface ClearButtonProps {
  patientId: string
}
const ClearButton = ({ patientId }: ClearButtonProps) => {
  const form = useFormContext<SchemaType>()
  const { fetchPatientInfoHistories } = useStore((state) => ({
    fetchPatientInfoHistories: state.fetchPatientInfoHistories,
  }))
  const handleResetForm = () => {
    fetchPatientInfoHistories(patientId)
    form.reset({
      historyCreatedTo: undefined,
      historyCreatedFrom: undefined,
      username: '',
    })
  }
  return (
    <Button
      size="1"
      variant="outline"
      color="gray"
      type="button"
      className="text-black"
      onClick={handleResetForm}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
