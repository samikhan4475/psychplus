import React from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import {  StaffLocation } from '../types'
import { ProviderRegisterDetailView } from './provider-register-details'
import { StaffResource } from '@/types'
interface ProviderRegisterDetailDialogProps {
  open: boolean
  onClose: () => void
  onApiSuccess: () => void
  data: StaffLocation
  providerData: StaffResource | null
  loading: boolean
}

const ProviderRegisterDetailDialog = ({
  open,
  onClose,
  onApiSuccess,
  data,
  providerData,
  loading,
}: ProviderRegisterDetailDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content className="relative max-w-[800px]">
        <CloseDialogTrigger />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Register Provider
        </Dialog.Title>
        <ProviderRegisterDetailView data={data} 
          providerData={providerData}
          loading={loading} onApiSuccess={onApiSuccess} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default ProviderRegisterDetailDialog
