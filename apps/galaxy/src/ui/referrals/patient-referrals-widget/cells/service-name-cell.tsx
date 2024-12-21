'use client'

import { LongTextCell, PropsWithRow } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { PatientReferral, SelectOptionType } from '@/types'

const ServiceNameCell = ({
  row: { original: referral },
}: PropsWithRow<PatientReferral>) => {
  const options = useCodesetOptions(CODESETS.ServicesOffered, '', [
    CODE_NOT_SET,
  ])

  return (
    <LongTextCell>{getServiceLabel(options, referral.service)}</LongTextCell>
  )
}

const getServiceLabel = (options: SelectOptionType[], value: string) =>
  options?.find((option) => option.value === value)?.label

export { ServiceNameCell }
