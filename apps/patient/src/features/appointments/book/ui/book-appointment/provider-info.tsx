'use client'

import { getUserFullName } from '@psychplus-v2/utils'
import { Text } from '@radix-ui/themes'
import { AppointmentSpecialist } from '@/features/appointments/search/types'
import { AcsInfo } from '@/features/call/types'

interface ProviderInfoProps {
  acsInfo: AcsInfo
  isCall?: boolean
  specialist: AppointmentSpecialist
}

const ProviderInfo = ({ specialist, acsInfo, isCall }: ProviderInfoProps) => {
  const providerName = isCall
    ? getUserFullName({
        firstName: String(acsInfo?.staffName?.firstName),
        lastName: String(acsInfo?.staffName?.lastName),
      })
    : getUserFullName(specialist.legalName)

  const honors = isCall
    ? acsInfo?.staffName.honors
    : specialist.legalName.honors

  return (
    <Text
      weight="bold"
      className="font-[inherit] text-[16px] text-[#24366B] md:text-[20px]"
    >
      {providerName}
      {honors && `, ${honors}`}
    </Text>
  )
}

export default ProviderInfo
