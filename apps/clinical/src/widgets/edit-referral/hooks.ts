import memoize from 'micro-memoize'
import {
  CODE_NOT_SET,
  getCodeAttributeBoolean,
  type CodeSetIndex,
} from '@psychplus/codeset'
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

const useReferralStatusOptions = () =>
  computeReferralStatusOptions(useStore((state) => state.codeSetIndex))

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

export {
  useContactStatusOptions,
  useReferralStatusOptions,
  useServiceLabel,
  useStatusLabel,
}
