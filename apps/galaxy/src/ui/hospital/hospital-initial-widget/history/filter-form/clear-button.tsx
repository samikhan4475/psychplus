import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useStore } from '../store'
import { SchemaType } from './filter-form'

interface ClearButtonProps {
  patientId: string
  sectionName: QuickNoteSectionName
}
const ClearButton = ({ patientId, sectionName }: ClearButtonProps) => {
  const form = useFormContext<SchemaType>()
  const { fetchHospitalInititalHistories } = useStore((state) => ({
    fetchHospitalInititalHistories: state.fetchHospitalInititalHistories,
  }))
  const handleResetForm = () => {
    fetchHospitalInititalHistories(patientId, sectionName)
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
