'use client'

import { LongTextCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { PatientReferral, SelectOptionType } from '@/types'

const GenderLabelCell = ({
  row: { original: referral },
}: PropsWithRow<PatientReferral>) => {
  const options = useCodesetOptions(CODESETS.CustomerStatus)

  return (
    <LongTextCell>{getGenderLabel(options, referral.patientStatus)}</LongTextCell>
    
  )
}

const getGenderLabel = (options: SelectOptionType[], value: string) =>
  options?.find((option) => option.value === value)?.label

export { GenderLabelCell }
