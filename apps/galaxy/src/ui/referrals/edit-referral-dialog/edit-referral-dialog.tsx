'use client'

import { useMemo, useState } from 'react'
import { Dialog, Flex, IconButton, Separator } from '@radix-ui/themes'
import { PencilLine, X } from 'lucide-react'
import { PatientReferral } from '@/types'
import {
  isReferralDeleted,
  isReferralEditAble,
} from '../patient-referrals-widget/utils'
import { EditReferralForm } from './edit-referral-form'

interface EditReferralDialogProps {
  referral: PatientReferral
  onClose?: () => void
}

const EditReferralDialog = ({ referral, onClose }: EditReferralDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => setIsOpen(false)
  const isDisabled = useMemo(
    () =>
      isReferralDeleted(referral.resourceStatus) ||
      isReferralEditAble(referral.resourceStatus),
    [referral.resourceStatus],
  )

  return (
    <Dialog.Root open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <Dialog.Trigger disabled={isDisabled}>
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
      <Dialog.Content className="w-[470px] rounded-2 p-6">
        <Flex justify="between" align="start" gap="2">
          <Dialog.Title size="5" weight="medium">
            Edit Referral
          </Dialog.Title>
          <Dialog.Close className="cursor-pointer">
            <X size={22} strokeWidth={1} />
          </Dialog.Close>
        </Flex>
        <Separator
          className="border-pp-grey mb-4 w-full"
          orientation="horizontal"
        />
        <EditReferralForm
          referral={referral}
          handleCloseDialog={handleClose}
          onClose={onClose}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { EditReferralDialog }
