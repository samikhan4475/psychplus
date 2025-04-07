import { Suspense } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { AssessmentPlanLoader as AssessmentPlanWidget } from '@/ui/assessment-plan/assessment-plan-loader'

interface AssessmentPlanVisitViewProps {
  params: {
    id: string
    apptId: string
  }
  searchParams: {
    id: string
  }
}

const AssessmentPlanVisitViewPage = ({
  params,
  searchParams,
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
      <AssessmentPlanWidget
        patientId={params.id}
        appointmentId={searchParams.id}
      />
    </Suspense>
  )
}

export default AssessmentPlanVisitViewPage
