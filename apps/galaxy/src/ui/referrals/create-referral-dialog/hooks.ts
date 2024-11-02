import { useFormContext } from 'react-hook-form'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SharedCode } from '@/types'
import {
  CODE_SET_ATTRIBUTE_IS_EMERGENCY_STATUS_ALLOWED,
  EMERGENCY_REFERRAL_SERVICE_STATUS,
} from './constants'
import { SchemaType } from './create-referral-form'

const computeStatusOptions = (
  servicesOfferedCodes: SharedCode[],
  serviceStatusCodes: SharedCode[],
  service: string,
) => {
  const serviceTypeCode = servicesOfferedCodes?.find(
    (code) => code.value === service,
  )

  const emergencyStatus = serviceTypeCode?.attributes?.find(
    (attr) => attr.name === CODE_SET_ATTRIBUTE_IS_EMERGENCY_STATUS_ALLOWED,
  )?.value

  const emergencyStatusOnly = emergencyStatus === 'Only'
  const allowEmergencyStatus = emergencyStatusOnly || emergencyStatus === 'True'

  const statusOptions =
    serviceStatusCodes
      ?.filter((code) => code.value !== CODE_NOT_SET)
      .map((code) => {
        const disabled =
          (!allowEmergencyStatus &&
            code.value === EMERGENCY_REFERRAL_SERVICE_STATUS) ||
          (emergencyStatusOnly &&
            code.value !== EMERGENCY_REFERRAL_SERVICE_STATUS)

        return {
          value: code.value,
          label: code.display,
          disabled,
        }
      }) ?? []

  return {
    statusOptions,
    allowEmergencyStatus,
    emergencyStatusOnly,
  }
}

const useServiceStatusOptions = () =>
  computeStatusOptions(
    useCodesetCodes(CODESETS.ServicesOffered),
    useCodesetCodes(CODESETS.ServicesStatus),
    useFormContext<SchemaType>().watch('service'),
  )

export { useServiceStatusOptions }
