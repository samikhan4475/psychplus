'use client'

import { PropsWithRow, TextCell } from '@/components'
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
    <TextCell className="truncate" wrapperClass="bg-gray-3 w-full">
      {getServiceLabel(options, referral.service)}
    </TextCell>
  )
}

const getServiceLabel = (options: SelectOptionType[], value: string) =>
  options?.find((option) => option.value === value)?.label

export { ServiceNameCell }
