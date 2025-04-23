'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore } from '../store'
import { PatientMedicationFilterSchemaType } from './schema'

interface ClearButtonProps {
  patientId: string
}
const ClearButton = ({ patientId }: ClearButtonProps) => {
  const form = useFormContext<PatientMedicationFilterSchemaType>()
  const { fetchPatientMedication } = useStore((state) => ({
    fetchPatientMedication: state.fetchPatientMedication,
  }))
  const handleClear = () => {
    form.reset({
      drugName: '',
      endDate: undefined,
      medicationStatuses: '',
      pharmacyNcpdpId: '',
      recordStatuses: '',
      writtenDate: undefined,
      prescribingStaffId: '',
      patientIds: [Number(patientId)],
    })
    return fetchPatientMedication({}, 1)
  }
  return (
    <Button
      size="1"
      color="gray"
      className="text-black"
      variant="outline"
      type="button"
      onClick={handleClear}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
