'use client'

import { LongTextCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { PatientReferral } from '@/types'
import { getUserStatus } from '@/utils'

const GenderLabelCell = ({
  row: { original: referral },
}: PropsWithRow<PatientReferral>) => {
  const options = useCodesetOptions(CODESETS.CustomerStatus)

  return (
    <LongTextCell>
      {getUserStatus(options, referral.patientStatus)}
    </LongTextCell>
  )
}

export { GenderLabelCell }
