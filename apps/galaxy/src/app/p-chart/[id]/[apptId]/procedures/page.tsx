import { Suspense } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { ProcedureWidgetLoader as ProcedureWidgetView } from '@/ui/procedures/procedures-widget-loader'

interface ProcedureVisitViewPageProps {
  params: {
    id: string
    apptId: string
  }
  searchParams: {
    id: string
    visitType: string
    visitSequence: string
  }
}

const ProcedureVisitViewPage = ({
  params,
  searchParams,
}: ProcedureVisitViewPageProps) => {
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
      <ProcedureWidgetView
        patientId={params.id}
        appointmentId={searchParams.id}
        visitSequence={searchParams.visitSequence}
        visitType={searchParams.visitSequence}
      />
    </Suspense>
  )
}

export default ProcedureVisitViewPage
