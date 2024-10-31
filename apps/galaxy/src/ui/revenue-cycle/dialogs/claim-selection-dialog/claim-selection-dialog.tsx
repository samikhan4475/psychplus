'use client'

import React, { useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { Claim } from '@/types'
import { useStore } from '../../insurance-payment-tab/store'
import { useStore as useTabStore } from '../../store'
import { ClaimListFilterForm } from './claim-list-filter-form'
import { ClaimListTable } from './claim-list-table'

const ClaimSelectionDialog = () => {
  const setPaymentPostingClaim = useStore(
    (state) => state.setPaymentPostingClaim,
  )
  const activeTab = useTabStore((state) => state.activeTab)
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)

  const handlePaymentPostingClaim = (claim: Claim) => {
    setIsOpenDialog(false)
    setPaymentPostingClaim(activeTab, claim)
  }

  return (
    <Dialog.Root
      open={isOpenDialog}
      onOpenChange={(open) => setIsOpenDialog(!!open)}
    >
      <Dialog.Trigger>
        <Button size="1" highContrast variant="solid">
          <PlusIcon />
          Add New Claim
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[1121px]">
        <CloseDialogTrigger />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Select Claim
        </Dialog.Title>
        <Flex gapY="2" direction="column">
          <ClaimListFilterForm />
          <ClaimListTable
            handlePaymentPostingClaim={handlePaymentPostingClaim}
          />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ClaimSelectionDialog }
