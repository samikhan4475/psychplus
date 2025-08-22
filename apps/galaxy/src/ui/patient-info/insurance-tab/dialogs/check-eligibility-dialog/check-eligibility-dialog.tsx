'use client'

import { Dialog, Flex } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { TabContentHeading } from '@/components'
import { Insurance } from '@/types'
import { CheckEligibilityForm } from './check-eligibility-form'
import { CheckEligibilityFilterForm } from './check-eligibility-log/check-eligibility-filter-form'
import { CheckEligibilityTable } from './check-eligibility-log/check-eligibility-table'
import { CheckEligibilityTablePagination } from './check-eligibility-log/check-eligibility-table-pagination'

interface CheckEligibilityDialogProps {
  open?: boolean
  onClose?: () => void
  insurance?: Insurance
  patientId?: string
}
const CheckEligibilityDialog = ({
  open,
  onClose,
  insurance,
  patientId,
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
        <CheckEligibilityForm insurance={insurance} patientId={patientId} />
        <Flex direction="column">
          <TabContentHeading
            className="my-3 bg-gray-2"
            title="Eligibility Log"
          />
          <CheckEligibilityFilterForm patientId={patientId} />
          <CheckEligibilityTable patientId={patientId} />
          <CheckEligibilityTablePagination />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { CheckEligibilityDialog }
