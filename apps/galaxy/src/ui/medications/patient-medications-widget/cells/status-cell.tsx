'use client'
import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { PatientMedication, PatientPrescriptionStatus } from '../types'
import { PropsWithRow, SelectCell } from '@/components'
import { STATUS_CODESET } from '../constants'
import toast from 'react-hot-toast'
import { updatePatientMedicationAction } from '../actions'
import { useParams } from 'next/navigation'


const StatusCell = ({ row: { original } }: PropsWithRow<PatientMedication>) => {
  const defaultStatus = original.prescriptionStatusTypeId ? original.prescriptionStatusTypeId.toString() : '';
  const [selectedValue, setSelectedValue] = useState(defaultStatus)
  const patientId = useParams().id as string
  const isCancelledOrAwaitingApproval =
    selectedValue === PatientPrescriptionStatus.CANCELLED || selectedValue === PatientPrescriptionStatus.AWAITING_APPROVAL;

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
        disabled={isCancelledOrAwaitingApproval}
      />
    </Flex>
  )
}

export { StatusCell }