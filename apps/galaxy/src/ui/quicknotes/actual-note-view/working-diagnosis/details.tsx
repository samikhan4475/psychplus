'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Text } from '@radix-ui/themes'
import { DiagnosisIcd10Code } from '@/types'
import { shouldDisableDiagnosisActions } from '@/ui/diagnosis/diagnosis/utils'
import { BlockContainer } from '../shared'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<DiagnosisIcd10Code[]>) => {
  const searchParams = useSearchParams()
  const visitType = searchParams.get('visitType') ?? ''
  const visitSequence = searchParams.get('visitSequence') ?? ''
  const isDisabled = useMemo(
    () => shouldDisableDiagnosisActions(visitType, visitSequence),
    [visitType, visitSequence],
  )
  if (data.length === 0) return null
  return (
    <BlockContainer
      heading={`${isDisabled ? 'Admitting' : 'Working'} Diagnosis`}
    >
      {data.map((diagnosis) => (
        <Text key={diagnosis.id} size="1">
          {`${diagnosis.code} ${diagnosis.description}`}
        </Text>
      ))}
    </BlockContainer>
  )
}

export { Details }
