import { Text } from '@radix-ui/themes'
import { getAppointment } from '@/api'
import { getProcedureEct } from './ect-tab/api'
import { ProceduresView } from './procedures-view'
import { getProcedureSpravato } from './spravato-tab/api'
import { getProcedureTms } from './tms-tab/api'
import { getQuestionnairesHistories } from './tms-tab/api/get-questionnaires-history'

interface ProcedureWidgetLoaderProps {
  patientId: string
  appointmentId: string
  visitType: string
  visitSequence: string
}

const ProcedureWidgetLoader = async ({
  patientId,
  appointmentId,
  visitType,
  visitSequence,
}: ProcedureWidgetLoaderProps) => {
  const [
    procedureEctResponse,
    procedureTmsResponse,
    procedureSpravatoResponse,
    questionnaireHistoriesResponse,
    appointmentResponse,
  ] = await Promise.all([
    getProcedureEct({ patientId }),
    getProcedureTms({ patientId }),
    getProcedureSpravato({ patientId }),
    getQuestionnairesHistories({ patientId }),
    getAppointment({ id: appointmentId }),

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
      patientId={patientId}
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

export { ProcedureWidgetLoader }
