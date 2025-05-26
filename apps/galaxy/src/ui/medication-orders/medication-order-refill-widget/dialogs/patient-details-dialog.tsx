import React from 'react'
import { Box, Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { PatientPersonInfo } from '../types'
import { PatientInfoTable } from './patient-info-table'

interface PatientDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  patient: PatientPersonInfo
}

const PatientDetailsDialog = ({
  open,
  onOpenChange,
  patient,
}: PatientDetailsDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="relative max-w-[800px]">
        <Dialog.Title>Prescriber System Demographics </Dialog.Title>
        <CloseDialogTrigger className="absolute right-4 top-4 z-50" />
        <Box mt="4">
          <PatientInfoTable patient={[patient]} />
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default PatientDetailsDialog
