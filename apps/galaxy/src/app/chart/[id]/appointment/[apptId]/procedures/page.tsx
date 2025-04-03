import { Text } from '@radix-ui/themes'
import { ProceduresView } from 'src/ui/procedures'
import { getAppointment } from '@/api'
import { getProcedureEct } from '@/ui/procedures/ect-tab/api'
import { getProcedureSpravato } from '@/ui/procedures/spravato-tab/api'
import { getProcedureTms } from '@/ui/procedures/tms-tab/api'
import { getQuestionnairesHistories } from '@/ui/procedures/tms-tab/api/get-questionnaires-history'

interface ProcedurePageProps {
  params: {
    id: string
  }
  searchParams: {
    id: string
    visitType: string
    visitSequence: string
  }
}

const ProcedurePage = async ({ params, searchParams }: ProcedurePageProps) => {
  const [
    procedureEctResponse,
    procedureTmsResponse,
    procedureSpravatoResponse,
    questionnaireHistoriesResponse,
    appointmentResponse,
  ] = await Promise.all([
    getProcedureEct({ patientId: params.id }),
    getProcedureTms({ patientId: params.id }),
    getProcedureSpravato({ patientId: params.id }),
    getQuestionnairesHistories({ patientId: params.id }),
    getAppointment({ id: searchParams.id }),

    //add more APis for other tabs
  ])

  if (procedureEctResponse.state === 'error') {
    return <Text>{procedureEctResponse.error}</Text>
  }

  if (procedureTmsResponse.state === 'error') {
    return <Text>{procedureTmsResponse.error}</Text>
  }

  if (procedureSpravatoResponse.state === 'error') {
    return <Text>{procedureSpravatoResponse.error}</Text>
  }

  if (questionnaireHistoriesResponse.state === 'error') {
    return <Text>{questionnaireHistoriesResponse.error}</Text>
  }

  if (appointmentResponse.state === 'error') {
    return <Text>{appointmentResponse.error}</Text>
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
      appointmentData={
        appointmentResponse.state === 'success'
          ? appointmentResponse.data
          : null
      }
    />
  )
}

export default ProcedurePage
