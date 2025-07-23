'use client'

import { useState } from 'react'
import { Button, Dialog } from '@radix-ui/themes'
import { ShuffelIcon } from '@/components/icons/shuffel-icon'
import { PreferredPartnerUser } from '@/types'
import { LinkAccountDialogContent } from './link-account-dialog/link-account-dialog-content'
import { PreferredPartnerLinkDialogContent } from './preferred-partner-link-dialog-content'

interface AddAccountLinkDialogProps {
  onCloseModal?: (open: boolean) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  preferredPartnerUser?: PreferredPartnerUser
  context?: 'active' | 'worklist'
}

const AddAccountLink = ({
  onCloseModal,
  open,
  onOpenChange,
  preferredPartnerUser,
  context = 'active',
}: AddAccountLinkDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false)

  const isOpen = open ?? internalOpen
  const handleOpenChange = onOpenChange ?? setInternalOpen

  const handleCloseModal = (openDialog: boolean) => {
    handleOpenChange(openDialog)
    onCloseModal?.(true)
  }

  const defaultTrigger = (
    <Button
      color="gray"
      className="text-black bg-white disabled:!bg-pp-gray-2"
      size="1"
      variant="surface"
    >
      <ShuffelIcon /> Link Account
    </Button>
  )

  const dialogContent = preferredPartnerUser ? (
    <PreferredPartnerLinkDialogContent
      preferredPartnerUser={preferredPartnerUser}
      onClose={() => handleOpenChange(false)}
      context={context}
    />
  ) : (
    <LinkAccountDialogContent />
  )

  if (open !== undefined) {
    return (
      <Dialog.Root open={isOpen} onOpenChange={handleCloseModal}>
        {dialogContent}
      </Dialog.Root>
    )
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleCloseModal}>
      <Dialog.Trigger>{defaultTrigger}</Dialog.Trigger>
      {dialogContent}
    </Dialog.Root>
  )
}

export { AddAccountLink }
