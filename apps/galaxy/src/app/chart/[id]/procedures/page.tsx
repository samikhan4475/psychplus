import toast from 'react-hot-toast'
import { ProceduresView } from 'src/ui/procedures'
import { getProcedureEct } from '@/ui/procedures/ect-tab/api'
import { getProcedureTms } from '@/ui/procedures/tms-tab/api'

interface ProcedurePageProps {
  params: {
    id: string
  }
}

const ProcedurePage = async ({ params }: ProcedurePageProps) => {
  const [procedureEctResponse, procedureTmsResponse] = await Promise.all([
    getProcedureEct({ patientId: params.id }),
    getProcedureTms({ patientId: params.id }),
    //add more APis for other tabs
  ])

  if (procedureEctResponse.state === 'error') {
    toast.error('Failed to fetch ECT data')
  }

  if (procedureTmsResponse.state === 'error') {
    toast.error('Failed to fetch TMS data')
  }

  return (
    <ProceduresView
      patientId={params.id}
      procedureEctData={
        procedureEctResponse.state === 'success'
          ? procedureEctResponse.data.procedureEctData
          : []
      }
      procedureTmsData={
        procedureTmsResponse.state === 'success'
          ? procedureTmsResponse.data
          : []
      }
    />
  )
}

export default ProcedurePage
