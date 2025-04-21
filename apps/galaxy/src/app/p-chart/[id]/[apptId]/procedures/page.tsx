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
    <ProcedureWidgetView
      patientId={params.id}
      appointmentId={searchParams.id}
      visitSequence={searchParams.visitSequence}
      visitType={searchParams.visitSequence}
    />
  )
}

export default ProcedureVisitViewPage
