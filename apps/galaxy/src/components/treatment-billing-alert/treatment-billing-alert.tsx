'use client'

import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Box, Dialog, Flex, Text } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { StaffComment } from '@/types'
import { TreatmentBillingAlertTable } from './treatment-billing-alert-table'

interface TreatmentBillingAlertProps {
  isOpen?: boolean
  closeDialog?: () => void
  billingComments?: StaffComment[]
  treatmentComments?: StaffComment[]
  title?: string
}

const TreatmentBillingAlert = ({
  isOpen,
  closeDialog,
  title,
  billingComments,
  treatmentComments,
}: TreatmentBillingAlertProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={closeDialog}>
      <Dialog.Content className="bg-pp-warning-bg-1 max-w-[857px] rounded-4 p-5">
        <Dialog.Title size="3" className="mb-2">
          <Flex align="center" gap="3">
            <ExclamationTriangleIcon
              width={18}
              height={18}
              className="text-[#F4B654]"
            />
            {title}
          </Flex>
        </Dialog.Title>
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        {billingComments && billingComments.length > 0 && (
          <Box className="mb-5">
            <Text size="2">Billing Alert</Text>
            <TreatmentBillingAlertTable data={billingComments} />
          </Box>
        )}
        {treatmentComments && treatmentComments.length > 0 && (
          <Box>
            <Text size="2">Treatment Alert</Text>
            <TreatmentBillingAlertTable data={treatmentComments} />
          </Box>
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { TreatmentBillingAlert }
