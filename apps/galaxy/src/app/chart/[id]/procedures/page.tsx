import { ProceduresView } from 'src/ui/procedures'

interface ProcedurePageProps {
  params: {
    id: string
  }
}

const ProcedurePage = async ({ params }: ProcedurePageProps) => {
  return <ProceduresView patientId={params.id} />
}

export default ProcedurePage