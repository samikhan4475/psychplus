'use client'

import { Suspense, use } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { ActionResult, QuickNoteSectionItem } from '@/types'
import { useStore } from '@/ui/quicknotes/store'
import { transformIn } from './data'
import { FitForDutyPsychEvalWidget } from './widget'

interface Props {
  promise: Promise<ActionResult<QuickNoteSectionItem[]>>
  patientId: string
  isHeader?: boolean
}
const ClientWrapper = ({ patientId, isHeader, promise }: Props) => {
  const patientVitals = useStore((state) => state.patientVitals)
  const result = use(promise)

  if (result.state === 'error') return <Text>{result.error}</Text>

  const initialValue = transformIn({ data: result.data, patientVitals })

  return (
    <Suspense
      fallback={
        <Flex
          direction="column"
          align="center"
          justify="center"
          flexGrow="1"
          className="h-full"
        >
          <LoadingPlaceholder />
        </Flex>
      }
    >
      <FitForDutyPsychEvalWidget
        patientId={patientId}
        initialValue={initialValue}
        isHeader={isHeader}
      />
    </Suspense>
  )
}

export { ClientWrapper }
