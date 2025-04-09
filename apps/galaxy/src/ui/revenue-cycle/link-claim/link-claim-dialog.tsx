'use client'

import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { Claim } from '@/types'
import { LinkClaimForm } from './link-claim-form'

interface LinkClaimDialogProps {
  row: Claim
  openDialog?: boolean
  handleCloseModal: () => void
}
const LinkClaimDialog = ({
  row,
  openDialog,
  handleCloseModal,
}: LinkClaimDialogProps) => {
  return (
    <Dialog.Root open={openDialog} onOpenChange={handleCloseModal}>
      <Dialog.Content className="relative max-w-[1300px]">
        <CloseDialogTrigger />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Link Claim with Visit
        </Dialog.Title>
        <LinkClaimForm data={row} handleCloseModal={handleCloseModal}/>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { LinkClaimDialog }
