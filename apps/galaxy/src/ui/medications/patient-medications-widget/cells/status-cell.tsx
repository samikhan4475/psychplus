import { Flex } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { PatientMedication } from '../types'
import { SelectCell } from '@/components'
import { STATUS_CODESET } from '../constants'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { updatePatientMedicationAction } from '../actions'
import { useParams } from 'next/navigation'

interface StatusCellProps {
  row: Row<PatientMedication>
}

const StatusCell = ({ row: { original } }: StatusCellProps) => {
  const defaultStatus = original.prescriptionStatusTypeId ? original.prescriptionStatusTypeId.toString() : '';
  const [selectedValue, setSelectedValue] = useState(defaultStatus)
  const patientId = useParams().id as string

  const updateMedicationStatus = async (value: string) => {
    setSelectedValue(value)
    const selectedName = STATUS_CODESET.find((status) => status.value === value)?.label || '';
    const result = await updatePatientMedicationAction({
      patientId,
      payload: {
        prescriptionStatus: {
          prescriptionStatusTypeId: value,
          prescriptionId: original.externalPrescriptionId,
          name: selectedName
        }
      }
    })
    if (result.state === 'success') {
      toast.success('Successfully updated!')
    } else if (result.state === 'error') {
      setSelectedValue(original.medicationDetails.prescriptionStatus ?? '')
      toast.error(result.error ?? 'Failed to update!')
    }
  }

  return (
    <Flex className="w-40 items-center gap-2">
      <SelectCell
        value={selectedValue}
        onValueChange={updateMedicationStatus}
        options={STATUS_CODESET}
      />
    </Flex>
  )
}

export { StatusCell }
