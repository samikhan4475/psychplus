'use client'

import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { PreferredPartnerUser } from '@/types'
import { LinkAccountForm } from './link-account-dialog/filters/link-account-form'
import { PreferredPartnerLinkTable } from './preferred-partner-link-table'

interface PreferredPartnerLinkDialogContentProps {
  preferredPartnerUser: PreferredPartnerUser
  onClose?: () => void
}

export const PreferredPartnerLinkDialogContent = ({ 
  preferredPartnerUser,
  onClose
}: PreferredPartnerLinkDialogContentProps) => {
  return (
    <Dialog.Content className="relative w-[1600px] max-w-full !overflow-visible rounded-3 p-6">
      <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
        <X size={20} strokeWidth={1.5} />
      </Dialog.Close>
      <Dialog.Title size="6" className="font-medium">
        Link Preferred Partner User to Patient
      </Dialog.Title>
      <LinkAccountForm />
      <PreferredPartnerLinkTable 
        preferredPartnerUser={preferredPartnerUser} 
        onCloseModal={onClose}
      />
    </Dialog.Content>
  )
}
