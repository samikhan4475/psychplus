import { useEffect, useMemo } from 'react'
import memoize from 'micro-memoize'
import { useFormContext } from 'react-hook-form'
import {
  CODE_NOT_SET,
  getCodeAttribute,
  type CodeSetIndex,
} from '@psychplus/codeset'
import { usePatientId } from '@psychplus/patient'
import { usePubsub } from '@psychplus/utils/event'
import { daysAgo } from '@psychplus/utils/time'
import { EVENT_REFERRAL_CREATED } from '@psychplus/widgets/events'
import { getReferrals } from './api.client'
import { type SchemaType } from './components'
import {
  DEFAULT_REFERRAL_SERVICE_STATUS,
  EMERGENCY_REFERRAL_SERVICE_STATUS,
} from './constants'
import { useStore } from './store'

const CODE_SET_SERVICE_OFFERED = 'ServicesOffered'
const CODE_SET_SERVICES_STATUS = 'ServicesStatus'
const CODE_SET_ATTRIBUTE_IS_EMERGENCY_STATUS_ALLOWED =
  'IsEmergencyStatusAllowed'

const useServiceOptions = memoize(() =>
  useStore(
    (state) =>
      state.codeSetIndex[CODE_SET_SERVICE_OFFERED]?.filter(
        (code) => code.code !== CODE_NOT_SET,
      ).map((code) => ({
        value: code.code,
        label: code.display,
      })) ?? [],
  ),
)

const computeStatusOptions = memoize(
  (codeSetIndex: CodeSetIndex, service: string) => {
    const serviceTypeCode = codeSetIndex[CODE_SET_SERVICE_OFFERED]?.find(
      (code) => code.code === service,
    )

    const emergencyStatus = serviceTypeCode
      ? getCodeAttribute(
          serviceTypeCode,
          CODE_SET_ATTRIBUTE_IS_EMERGENCY_STATUS_ALLOWED,
        )
      : null

    const emergencyStatusOnly = emergencyStatus === 'Only'
    const allowEmergencyStatus =
      emergencyStatusOnly || emergencyStatus === 'True'

    const statusOptions =
      codeSetIndex[CODE_SET_SERVICES_STATUS]?.filter(
        (code) => code.code !== CODE_NOT_SET,
      ).map((code) => {
        const disabled =
          (!allowEmergencyStatus &&
            code.code === EMERGENCY_REFERRAL_SERVICE_STATUS) ||
          (emergencyStatusOnly &&
            code.code !== EMERGENCY_REFERRAL_SERVICE_STATUS)

        return {
          value: code.code,
          label: code.display,
          disabled,
        }
      }) ?? []

    return {
      statusOptions,
      allowEmergencyStatus,
      emergencyStatusOnly,
    }
  },
  { maxSize: 20 },
)

const useServiceStatusOptions = () =>
  computeStatusOptions(
    useStore((state) => state.codeSetIndex),
    useFormContext<SchemaType>().watch('service'),
  )

const useForceServiceStatus = ({
  allowEmergencyStatus,
  emergencyStatusOnly,
}: {
  allowEmergencyStatus: boolean
  emergencyStatusOnly: boolean
}) => {
  const form = useFormContext<SchemaType>()
  const status = form.watch('servicesStatus')

  useEffect(() => {
    if (status === EMERGENCY_REFERRAL_SERVICE_STATUS && !allowEmergencyStatus) {
      // If the current service type does not allow emergency status,
      // then reset the status back to the default service status.
      form.setValue('servicesStatus', DEFAULT_REFERRAL_SERVICE_STATUS)
    }

    if (emergencyStatusOnly && status !== EMERGENCY_REFERRAL_SERVICE_STATUS) {
      // If the current service type only allows emergency status,
      // then force the status to be emergency (if it is not already set).
      form.setValue('servicesStatus', EMERGENCY_REFERRAL_SERVICE_STATUS)
    }
  }, [form, status, emergencyStatusOnly, allowEmergencyStatus])
}

const useReferralExists = (service: string) => {
  const referrals = useStore((state) => state.referrals)

  // Check for existing active referral of same service type within the last 90 days.
  const referralExists = useMemo(() => {
    const ninetyDaysAgo = daysAgo(90)
    return (
      referrals.find(
        (referral) =>
          referral.service === service &&
          referral.resourceStatus !== 'Deleted' &&
          new Date(referral.metadata.createdOn) > ninetyDaysAgo,
      ) !== undefined
    )
  }, [referrals, service])

  return referralExists
}

const useRefetchReferrals = () => {
  const { subscribe } = usePubsub()
  const patientId = usePatientId(useStore)
  const setReferrals = useStore((state) => state.setReferrals)

  const refetch = useMemo(
    () => () => {
      getReferrals({ patientId })
        .then(setReferrals)
        .catch((err) => alert(err.message))
    },
    [patientId, setReferrals],
  )

  useEffect(() => {
    return subscribe(EVENT_REFERRAL_CREATED, refetch)
  }, [refetch, subscribe])
}

export {
  useServiceOptions,
  useServiceStatusOptions,
  useForceServiceStatus,
  useReferralExists,
  useRefetchReferrals,
}
