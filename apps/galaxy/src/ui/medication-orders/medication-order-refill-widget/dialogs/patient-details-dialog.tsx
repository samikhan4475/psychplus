import React from 'react'
import { Box, Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { PatientInfoTable } from './patient-info-table'

interface PatientDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PatientDetailsDialog = ({ open, onOpenChange }: PatientDetailsDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="relative max-w-[800px]">
        <CloseDialogTrigger className="absolute top-4 right-4 z-50" />
        <Box mt="4">
          <PatientInfoTable />
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default PatientDetailsDialog
