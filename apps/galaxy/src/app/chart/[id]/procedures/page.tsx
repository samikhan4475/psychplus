import { ProceduresView } from 'src/ui/procedures'
import { getProcedureEct } from '@/ui/procedures/ect-tab/api'

interface ProcedurePageProps {
  params: {
    id: string
  }
}

const ProcedurePage = async ({ params }: ProcedurePageProps) => {
  const [procedureEctResponse] = await Promise.all([
    getProcedureEct({ patientId: params.id }),
    //add more APis for other tabs
  ])

  if (procedureEctResponse.state === 'error') {
    throw new Error(procedureEctResponse.error)
  }

  return (
    <ProceduresView
      patientId={params.id}
      procedureEctData={procedureEctResponse.data.procedureEctData}
    />
  )
}

export default ProcedurePage
