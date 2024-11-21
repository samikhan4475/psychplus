import toast from 'react-hot-toast'
import { ProceduresView } from 'src/ui/procedures'
import { getProcedureEct } from '@/ui/procedures/ect-tab/api'
import { getProcedureSpravato } from '@/ui/procedures/spravato-tab/api'
import { getProcedureTms } from '@/ui/procedures/tms-tab/api'
import { getQuestionnairesHistories } from '@/ui/procedures/tms-tab/api/get-questionnaires-history'

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
    questionnaireHistoriesResponse,
  ] = await Promise.all([
    getProcedureEct({ patientId: params.id }),
    getProcedureTms({ patientId: params.id }),
    getProcedureSpravato({ patientId: params.id }),
    getQuestionnairesHistories({ patientId: params.id }),
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
      questionnaireHistories={
        questionnaireHistoriesResponse.state === 'success'
          ? questionnaireHistoriesResponse.data
          : []
      }
    />
  )
}

export default ProcedurePage
