'use client'

import { AppointmentType } from '@psychplus-v2/constants'
import { Clinic } from '@psychplus-v2/types'
import {
  getAppointmentTypeLabel,
  getClinicAddressLabel,
  getNewProviderTypeLabel,
} from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'

interface AppointmentTypeInfoProps {
  appointmentType: AppointmentType
  newProviderType?: string | null
  clinic: Clinic
}

const AppointmentTypeInfo = ({
  appointmentType,
  newProviderType,
  clinic,
}: AppointmentTypeInfoProps) => (
  <>
    <Flex gap="1">
      <Text weight="medium" className="text-[13px] text-accent-11">
        {getNewProviderTypeLabel(newProviderType || '').toLocaleUpperCase()} -
      </Text>
      <Text weight="medium" className="text-[13px] text-accent-11">
        {getAppointmentTypeLabel(appointmentType).toLocaleUpperCase()}
      </Text>
    </Flex>
    {appointmentType === AppointmentType.InPerson && (
      <Text className="text-[12px] text-[#1C2024] md:text-[14px]" weight="bold">
        {getClinicAddressLabel(clinic.contact?.addresses)}
      </Text>
    )}
  </>
)

export default AppointmentTypeInfo
