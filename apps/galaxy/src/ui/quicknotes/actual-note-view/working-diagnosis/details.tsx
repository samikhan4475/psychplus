import { Text } from '@radix-ui/themes'
import { DiagnosisIcd10Code } from '@/types'
import { BlockContainer } from '../shared'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<DiagnosisIcd10Code[]>) => {
  if (data.length === 0) return null
  return (
    <BlockContainer heading="Working Diagnosis">
      {data.map((diagnosis) => (
        <Text key={diagnosis.id} size="1">
          {`${diagnosis.code} ${diagnosis.description}`}
        </Text>
      ))}
    </BlockContainer>
  )
}

export { Details }
