'use client'

import { useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { Practice } from '../types'
import { AddOrganizationStaffButton } from './add-organization-staff-button'
import { EditOrganizationStaffButton } from './edit-organization-staff-button'
import { OrganizationStaffForm } from './organization-staff-form'

interface DialogProps {
  data: Practice
  userId: string
}

const OrganizationStaffDialog = ({ data, userId }: DialogProps) => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {data ? <EditOrganizationStaffButton /> : <AddOrganizationStaffButton />}

      <Dialog.Content className="relative max-w-[800px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Edit Organization & Practice
        </Dialog.Title>

        <OrganizationStaffForm
          data={data}
          onClose={onOpenChange}
          userId={userId}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { OrganizationStaffDialog }
