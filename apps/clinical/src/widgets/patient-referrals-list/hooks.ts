import { useEffect, useMemo } from 'react'
import memoize from 'micro-memoize'
import {
  CODE_NOT_SET,
  getCodeAttributeBoolean,
  type CodeSetIndex,
} from '@psychplus/codeset'
import { usePatientId } from '@psychplus/patient'
import { getPatientReferrals } from '@psychplus/referrals/api.client'
import { usePubsub } from '@psychplus/utils/event'
import {
  EVENT_REFERRAL_CREATED,
  EVENT_REFERRAL_EDITED,
} from '@psychplus/widgets/events'
import { useStore } from './store'

const CODE_SET_SERVICES_OFFERED = 'ServicesOffered'
const CODE_SET_SERVICES_STATUS = 'ServicesStatus'
const CODE_SET_CONTACT_MADE_STATUS = 'ContactMadeStatus'
const CODE_SET_RESOURCE_STATUS = 'ResourceStatus'

const computeContactStatusOptions = memoize(
  (codeSetIndex: CodeSetIndex) =>
    codeSetIndex[CODE_SET_CONTACT_MADE_STATUS]?.filter(
      (code) => code.code !== CODE_NOT_SET,
    ).map((code) => ({
      value: code.code,
      label: code.display,
      disabled: !getCodeAttributeBoolean(code, 'IsUserSelectable'),
    })) ?? [],
)

const computeReferralStatusOptions = memoize(
  (codeSetIndex: CodeSetIndex) =>
    codeSetIndex[CODE_SET_RESOURCE_STATUS]?.filter(
      (code) => code.code !== CODE_NOT_SET,
    ).map((code) => ({
      value: code.code,
      label: code.display,
    })) ?? [],
)

const computeServiceOptions = memoize(
  (codeSetIndex: CodeSetIndex) =>
    codeSetIndex[CODE_SET_SERVICES_OFFERED]?.filter(
      (code) => code.code !== CODE_NOT_SET,
    ).map((code) => ({
      value: code.code,
      label: code.display,
    })) ?? [],
)

const computeContactStatusFilterOptions = memoize(
  (codeSetIndex: CodeSetIndex) =>
    codeSetIndex[CODE_SET_CONTACT_MADE_STATUS]?.map((code) => ({
      value: code.code,
      label: code.code === CODE_NOT_SET ? 'Not Contacted' : code.display,
    })) ?? [],
)

const computeServiceLabel = memoize(
  (codeSetIndex: CodeSetIndex, service: string) =>
    codeSetIndex[CODE_SET_SERVICES_OFFERED]?.find(
      (code) => code.code === service,
    )?.display ?? 'N/A',
  { maxSize: 20 },
)

const computeStatusLabel = memoize(
  (codeSetIndex: CodeSetIndex, status: string) =>
    codeSetIndex[CODE_SET_SERVICES_STATUS]?.find((code) => code.code === status)
      ?.display ?? 'N/A',
  { maxSize: 10 },
)

const useContactStatusOptions = () =>
  computeContactStatusOptions(useStore((state) => state.codeSetIndex))

const useContactStatusFilterOptions = () =>
  computeContactStatusFilterOptions(useStore((state) => state.codeSetIndex))

const useReferralStatusOptions = () =>
  computeReferralStatusOptions(useStore((state) => state.codeSetIndex))

const useServiceOptions = () =>
  computeServiceOptions(useStore((state) => state.codeSetIndex))

const useServiceLabel = (service: string) =>
  computeServiceLabel(
    useStore((state) => state.codeSetIndex),
    service,
  )

const useStatusLabel = (status: string) =>
  computeStatusLabel(
    useStore((state) => state.codeSetIndex),
    status,
  )

const useRefetchReferrals = () => {
  const { subscribe } = usePubsub()
  const patientId = usePatientId(useStore)
  const setReferrals = useStore((state) => state.setReferrals)

  const refetch = useMemo(
    () => () => {
      if (!patientId) return
      getPatientReferrals({ patientId })
        .then(setReferrals)
        .catch((err) => alert(err.message))
    },
    [patientId, setReferrals],
  )

  useEffect(() => {
    return subscribe(EVENT_REFERRAL_CREATED, refetch)
  }, [refetch, subscribe])

  useEffect(() => {
    return subscribe(EVENT_REFERRAL_EDITED, refetch)
  }, [refetch, subscribe])
}

export {
  useRefetchReferrals,
  useContactStatusOptions,
  useContactStatusFilterOptions,
  useReferralStatusOptions,
  useServiceOptions,
  useServiceLabel,
  useStatusLabel,
}
