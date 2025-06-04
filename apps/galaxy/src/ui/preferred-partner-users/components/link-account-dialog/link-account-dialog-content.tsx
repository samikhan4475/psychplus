'use client'

import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { LinkAccountForm } from './filters/link-account-form'
import { AddLinkAccountTable } from './table/add-link-account-table'



export const LinkAccountDialogContent = () => {
  return (
    <Dialog.Content className="relative w-[1500px] max-w-full !overflow-visible rounded-3 p-6">
      <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
        <X size={20} strokeWidth={1.5} />
      </Dialog.Close>
      <Dialog.Title size="6" className="font-medium">
        Link Account
      </Dialog.Title>
      <LinkAccountForm />
      <AddLinkAccountTable  />
    </Dialog.Content>
  )
}
