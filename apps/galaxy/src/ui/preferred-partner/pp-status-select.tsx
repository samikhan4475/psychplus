'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes, useCodesetOptions } from '@/hooks'
import { getPPStatuses } from './utils'

const PPStatusSelect = () => {
  const fixedPaymentType = useCodesetOptions(CODESETS.FixedPaymentType)
  const ppStatuses = getPPStatuses(
    useCodesetCodes(CODESETS.PaymentType),
    useCodesetCodes(CODESETS.MembershipType),
  )
    ?.map((option) => ({ label: option.display, value: option.value }))
    .concat(fixedPaymentType)
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">PP Status</FormFieldLabel>
      <DropdownSelect field="subscriptionStatusList[0]" options={ppStatuses} />
    </FormFieldContainer>
  )
}

export { PPStatusSelect }
