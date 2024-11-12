import toast from 'react-hot-toast'
import { ProceduresView } from 'src/ui/procedures'
import { getProcedureEct } from '@/ui/procedures/ect-tab/api'
import { getProcedureSpravato } from '@/ui/procedures/spravato-tab/api'
import { getProcedureTms } from '@/ui/procedures/tms-tab/api'

interface ProcedurePageProps {
  params: {
    id: string
  }
}

const ProcedurePage = async ({ params }: ProcedurePageProps) => {
  const [
    procedureEctResponse,
    procedureTmsResponse,
    procedureSpravatoResponse,
  ] = await Promise.all([
    getProcedureEct({ patientId: params.id }),
    getProcedureTms({ patientId: params.id }),
    getProcedureSpravato({ patientId: params.id }),
    //add more APis for other tabs
  ])

  if (procedureEctResponse.state === 'error') {
    toast.error('Failed to fetch ECT data')
  }

  if (procedureTmsResponse.state === 'error') {
    toast.error('Failed to fetch TMS data')
  }

  if (procedureSpravatoResponse.state === 'error') {
    toast.error('Failed to fetch Spravato data')
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
      procedureSpravatoData={
        procedureSpravatoResponse.state === 'success'
          ? procedureSpravatoResponse.data
          : []
      }
    />
  )
}

export default ProcedurePage
