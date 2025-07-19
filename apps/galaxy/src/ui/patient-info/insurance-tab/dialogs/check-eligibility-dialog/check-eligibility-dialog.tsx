'use client'

import { Dialog, Flex } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { TabContentHeading } from '@/components'
import { CheckEligibilityForm } from './check-eligibility-form'
import { CheckEligibilityTable } from './check-eligibility-table'
import { CheckEligibilityTablePagination } from './check-eligibility-table-pagination'

interface CheckEligibilityDialogProps {
  open?: boolean
  onClose?: () => void
}
const CheckEligibilityDialog = ({
  open,
  onClose,
}: CheckEligibilityDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content className="relative max-w-[740px] rounded-2 px-6 py-7 ">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="5" weight="bold" className="m-0 mb-1.5">
          Eligibility
        </Dialog.Title>
        <CheckEligibilityForm />
        <Flex direction="column">
          <TabContentHeading
            className="my-3 bg-gray-2"
            title="Eligibility Log"
          />
          <CheckEligibilityTable />
          <CheckEligibilityTablePagination />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { CheckEligibilityDialog }
