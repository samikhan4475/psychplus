'use client'

import { useState } from 'react'
import { Box, Dialog, Text } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { WarningIcon } from '@/components/icons'
import { CircleWarningIcon } from '@/components/icons/circle-warning-icon'
import { LicenseType } from '../types'
import { LicenseExpiryTable } from './components'
import { useLicenseExpiryNotification } from './hook'

interface LicenseExpiryAlertProps {
  isInitialLogin: boolean
}

const licenseType = {
  [LicenseType.License]: 'License',
  [LicenseType.DEA]: 'DEA',
  [LicenseType.CDS]: 'CDS',
}

const LicenseExpiryAlert = ({ isInitialLogin }: LicenseExpiryAlertProps) => {
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0)
  const { isOpen, setIsOpen, data } =
    useLicenseExpiryNotification(isInitialLogin)

  const type = licenseType[data?.[currentTypeIndex]?.type]
  const licenses = data?.[currentTypeIndex]?.licenses || []
  if (!data.length || !licenses.length) return null
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          if (currentTypeIndex < data.length - 1) {
            setCurrentTypeIndex(currentTypeIndex + 1)
          } else setIsOpen(false)
        }
      }}
    >
      <Dialog.Content className="relative max-w-[700px]">
        <CloseDialogTrigger />

        <Box className="mb-5 flex items-center justify-center">
          <CircleWarningIcon
            className="!text-pp-warning-border"
            width={40}
            height={40}
          />
        </Box>
        <Dialog.Title className="items-center text-center font-sans -tracking-[0.25px]">
          <Text>Licenses Expiring Within 90 Days</Text>
        </Dialog.Title>
        <Box className='mb-2 text-center'>
          <Text className="mt-2 text-center">
            The following {type} are set to expire within the next 90 days.
            Please review the details and ensure timely renewal:
          </Text>
        </Box>

        <LicenseExpiryTable data={licenses || []} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { LicenseExpiryAlert }
