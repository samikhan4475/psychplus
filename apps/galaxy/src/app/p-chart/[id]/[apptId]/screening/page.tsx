import { Suspense } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { ScreeningLoader as ScreeningWidget } from '@/ui/screening/screening-loader'

interface AssessmentPlanVisitViewProps {
  params: {
    id: string
    apptId: string
  }
}

const AssessmentPlanVisitViewPage = ({
  params,
}: AssessmentPlanVisitViewProps) => {
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
      <ScreeningWidget patientId={params.id} />
    </Suspense>
  )
}

export default AssessmentPlanVisitViewPage
