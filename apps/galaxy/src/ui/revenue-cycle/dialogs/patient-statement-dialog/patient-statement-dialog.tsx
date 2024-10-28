'use client'

import { useState } from 'react'
import { EyeOpenIcon } from '@radix-ui/react-icons'
import { Dialog, IconButton, Tooltip } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { PatientStatement } from '../../types'
import { FooterDialog } from './footer-dialog'
import { PatientStatementFilterForm } from './patient-statement-filter-form'
import { PatientStatementTable } from './patient-statement-table'

interface DialogProps {
  data: PatientStatement
}

const PatientStatementDialog = ({ data }: DialogProps) => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Tooltip content="View Patient Statement">
        <Dialog.Trigger>
          <IconButton size="1" color="gray" variant="ghost">
            <EyeOpenIcon width={16} height={16} className="text-pp-gray-1" />{' '}
          </IconButton>
        </Dialog.Trigger>
      </Tooltip>

      <Dialog.Content className="relative max-w-[700px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Patient Statement List
        </Dialog.Title>

        <PatientStatementFilterForm patientId={data.patientId} />
        <PatientStatementTable patientId={data.patientId} />
        <FooterDialog />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PatientStatementDialog }
