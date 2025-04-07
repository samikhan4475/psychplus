'use client'

import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { LabelAndValue } from './label-and-value'

interface ResidingStateProps {
  stateCode: string
}
const ResidingState = ({ stateCode }: ResidingStateProps) => {
  const codes = useCodesetCodes(CODESETS.UsStates)
  const stateFound = codes.find((code) => code.value === stateCode)
  return <LabelAndValue label="Residing State" value={stateFound?.display} />
}

export { ResidingState }
