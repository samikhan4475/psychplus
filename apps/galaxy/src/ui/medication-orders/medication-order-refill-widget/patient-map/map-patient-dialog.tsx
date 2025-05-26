import React, { useMemo, useState } from 'react'
import { Box, Button, Dialog, Flex } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { PlusIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { MapPatientAction } from '../actions'
import { PatientInfoTable } from '../dialogs/patient-info-table'
import { useStore } from '../store'
import {
  MedicationRefill,
  PatientPersonInfo,
  RefillMedicationType,
} from '../types'
import { PatientMapForm } from './patient-map-form'
import { PatientMapTable } from './patient-map-table'

interface PatientMapDialogProps {
  row: Row<MedicationRefill>
}

const PatientMapDialog = ({ row }: PatientMapDialogProps) => {
  const {
    selectedPatient,
    searchMedicationsList,
    setSelectedPatient,
    activeTab,
  } = useStore((state) => ({
    selectedPatient: state.selectedPatient,
    setSelectedPatient: state.setSelectedPatient,
    searchMedicationsList: state.searchMedicationsList,
    activeTab: state.activeTab,
  }))

  const isRefillTab = activeTab.includes('Refill')

  const filteredData = useMemo(() => {
    return {
      ...row.original,
      drugList: row?.original?.drugList?.filter(
        (drug) =>
          drug.medicationType ===
          (isRefillTab
            ? RefillMedicationType.Dispensed
            : RefillMedicationType.Requested),
      ),
    }
  }, [row.original])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const onOpenChange = (open: boolean) => {
    setDialogOpen(open)
    if (!open) {
      setSelectedPatient(null)
    }
  }

  const handleMapPatient = async () => {
    if (!selectedPatient?.id) {
      toast.error('Please select patient ')
      return
    }
    setIsLoading(true)
    const result = await MapPatientAction({
      pharmacyNotificationId: row?.original?.pharmacyNotificationId,
      patientId: selectedPatient?.id.toString() ?? '',
    })
    if (result.state === 'error') {
      toast.error(result?.error ?? 'Failed to map patient')
    } else {
      toast.success('Patients are linked successfully')
      searchMedicationsList({})
      onOpenChange(false)
    }
    setSelectedPatient(null)
    setIsLoading(false)
  }
  return (
    <Dialog.Root open={dialogOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <Button size="1" highContrast className="text-1">
          Map Patient
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[1000px]">
        <CloseDialogTrigger />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Map Patient for this prescription
        </Dialog.Title>
        <PatientMapForm data={filteredData} onCloseModal={onOpenChange} />
        <PatientMapTable />
        <Flex gap="2" justify="end">
          <Button
            highContrast
            size="1"
            type="button"
            onClick={handleMapPatient}
            disabled={isLoading}
          >
            Map Now
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default PatientMapDialog
