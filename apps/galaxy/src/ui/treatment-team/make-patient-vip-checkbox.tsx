'use client'

import { useState } from 'react'
import { Checkbox, Flex, Text } from '@radix-ui/themes'
import { useHasPermission } from '@/hooks'
import { useStore as useGlobalStore } from '@/store'
import {
  MAKE_PATIENT_VIP_BY_OTHER,
  MAKE_PATIENT_VIP_BY_SELF,
} from './constants'

const MakePatientVIPCheckbox = ({
  appointmentsProviderId,
  setAlertInfo,
}: {
  appointmentsProviderId: number
  setAlertInfo: ({
    message,
    isOpen,
  }: {
    message: string
    isOpen: boolean
  }) => void
}) => {
  const [isTestStaff, setIsTestStaff] = useState(false)
  const { staffId } = useGlobalStore((state) => state.user)

  const canMakePatientVIPBySelf = useHasPermission('makePatientVIPAsProvider')
  const canMakePatientVIPByOther = useHasPermission('makePatientVIPNonProvider')
  const isSelfSchedule = staffId === appointmentsProviderId

  const handleCheckboxChange = (checked: boolean) => {
    if (isSelfSchedule && !canMakePatientVIPBySelf) {
      setAlertInfo({
        message: MAKE_PATIENT_VIP_BY_SELF,
        isOpen: true,
      })
      return
    }
    if (!isSelfSchedule && !canMakePatientVIPByOther) {
      setAlertInfo({
        message: MAKE_PATIENT_VIP_BY_OTHER,
        isOpen: true,
      })
      return
    }
    setIsTestStaff(checked)
  }

  return (
    <Flex align="center" gap="2" className="ml-10">
      <Text size="1" className="flex select-none items-center gap-2" as="label">
        <Checkbox
          checked={isTestStaff}
          onCheckedChange={(checked) => handleCheckboxChange(!!checked)}
          highContrast
          className="cursor-pointer"
        />
        Make Patient VIP
      </Text>
    </Flex>
  )
}

export { MakePatientVIPCheckbox }
