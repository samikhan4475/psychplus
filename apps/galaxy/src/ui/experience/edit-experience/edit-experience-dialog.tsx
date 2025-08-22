'use client'

import { useState } from 'react'
import { Dialog, Flex, IconButton, Separator } from '@radix-ui/themes'
import { PencilLine, X } from 'lucide-react'
import { Experience } from '@/types'
import { EditExperienceForm } from './edit-experience-form'

interface EditIntReferralDialogProps {
  experience: Experience
  onClose?: () => void
}

const EditExperienceDialog = ({
  experience,
  onClose,
}: EditIntReferralDialogProps) => {
  const [isDialogBoxOpen, setIsDialogBoxOpen] = useState(false)

  const handleDialogOpenChange = (isOpen: boolean) => setIsDialogBoxOpen(isOpen)
  const handleCloseDialog = () => setIsDialogBoxOpen(false)

  const renderTriggerButton = () => (
    <Dialog.Trigger>
      <IconButton
        size="1"
        color="gray"
        variant="ghost"
        className="text-black !m-0"
        type="button"
      >
        <PencilLine size={14} />
      </IconButton>
    </Dialog.Trigger>
  )

  const renderDialogHeader = () => (
    <Flex justify="between" align="start" gap="2">
      <Dialog.Title size="5" weight="medium">
        Edit Experience
      </Dialog.Title>
      <Dialog.Close className="cursor-pointer">
        <X size={22} strokeWidth={1} />
      </Dialog.Close>
    </Flex>
  )

  return (
    <Dialog.Root open={isDialogBoxOpen} onOpenChange={handleDialogOpenChange}>
      {renderTriggerButton()}
      <Dialog.Content className="w-[470px] rounded-2 p-6">
        {renderDialogHeader()}
        <Separator
          className="border-pp-grey mb-4 w-full"
          orientation="horizontal"
        />
        <EditExperienceForm
          experience={experience}
          handleCloseDialog={handleCloseDialog}
          onClose={onClose}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { EditExperienceDialog }
