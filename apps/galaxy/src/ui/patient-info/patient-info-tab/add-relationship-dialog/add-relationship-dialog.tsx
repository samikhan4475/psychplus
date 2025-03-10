'use client'

import { useState } from 'react'
import { Button, Dialog } from '@radix-ui/themes'
import { Plus, X } from 'lucide-react'
import { AddRelationshipForm } from './add-relationship-form'

interface AddRelationshipDialogProps {
  patientId: string
}

const AddRelationshipDialog = ({ patientId }: AddRelationshipDialogProps) => {
  const [openDialog, setOpenDialog] = useState(false)
  return (
    <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
      <Dialog.Trigger>
        <Button
          color="gray"
          className="text-black bg-white disabled:!bg-pp-gray-2"
          size="1"
          variant="surface"
        >
          <Plus size={14} /> Add
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[700px] !overflow-visible rounded-3 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="6" className="font-medium">
          Add Relationship
        </Dialog.Title>
        <AddRelationshipForm
          setDialogOpen={setOpenDialog}
          patientId={patientId}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddRelationshipDialog }
