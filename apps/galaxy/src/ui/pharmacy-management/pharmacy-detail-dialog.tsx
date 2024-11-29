import React from 'react'
import { Box, Dialog, Flex, Text, TextField } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { formatDate, getMaskedPhoneNumber } from '@/utils'
import { PharmacyDetailsConfigurationSection } from './pharmacy-details-configuration-section'
import { PharmacyDetailsGeneralInformationSection } from './pharmacy-details-generalInformation-section'
import { PharmacyDetailsServiceLevelsSection } from './pharmacy-details-serviceLevels-section'
import TextInputField from './text-input-field'
import { Pharmacy } from './types'

interface PharmacyDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  pharmacy: Pharmacy
}

const PharmacyDetailDialog = ({
  isOpen,
  onClose,
  pharmacy,
}: PharmacyDetailDialogProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className="bg-white shadow-lg relative max-w-[1000px] rounded-3 p-4">
        <CloseDialogTrigger />
        <Dialog.Title className="text-xl mb-4 flex items-center gap-2 font-sans">
          Pharmacy Details
        </Dialog.Title>
        <PharmacyDetailsGeneralInformationSection pharmacy={pharmacy} />
        <Box className="border-pp-gray-2 mt-3 rounded-3 border">
          <PharmacyDetailsConfigurationSection pharmacy={pharmacy} />
          <PharmacyDetailsServiceLevelsSection pharmacy={pharmacy} />
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PharmacyDetailDialog }
