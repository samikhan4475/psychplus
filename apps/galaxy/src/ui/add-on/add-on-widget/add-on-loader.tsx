import { Flex, Text } from '@radix-ui/themes'
import { getQuestionnairesHistoriesAction } from '@/actions'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { getAppointment } from '@/api'
import { VisitSequenceTypes } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { filterAndSort } from '@/utils'
import { AddOnWidget } from './add-on-widget'
import { getBookedAppointmentApi } from './api/booked-appointments-api'
import { transformIn } from './data'

interface PatientAddOnLoaderProps {
  patientId: string
  appointmentId: string
  visitType: string
  visitSequence: string
}

const AddOnLoader = async ({
  patientId,
  appointmentId,
  visitType,
  visitSequence,
}: PatientAddOnLoaderProps) => {
  const appointment = await getAppointment({ id: appointmentId })
  const isHospitalDisachargeVisit =
    ['HospitalCare', 'PhpCare', 'NursingHomeCare'].some((type) =>
      visitType.includes(type),
    ) && visitSequence === VisitSequenceTypes.Discharge

  if (appointment.state === 'error') {
    return <Text>Appointment with {appointmentId} not found</Text>
  }

  const [response, bookedAppointmentResponse, diagnosisResponse, mocaResponse] =
    await Promise.all([
      getQuickNoteDetailAction(
        patientId,
        [QuickNoteSectionName.Addon],
        false,
        appointmentId,
      ),
      getBookedAppointmentApi(appointment.data),
      getQuickNoteDetailAction(
        patientId,
        [
          isHospitalDisachargeVisit
            ? QuickNoteSectionName.QuicknoteSectionWorkingDischargeDiagnosis
            : QuickNoteSectionName.QuickNoteSectionDiagnosis,
        ],
        false,
        isHospitalDisachargeVisit ? appointmentId : undefined,
      ),
      getQuestionnairesHistoriesAction({
        patientId,
        sectionNames: [QuickNoteSectionName.QuickNoteSectionMoca],
      }),
    ])

  if (response.state === 'error') {
    return <Text>Add On Fail: {response.error}</Text>
  }

  if (bookedAppointmentResponse.state === 'error') {
    return <Text>{bookedAppointmentResponse.error}</Text>
  }
  if (diagnosisResponse.state === 'error') {
    return <Text>{diagnosisResponse.error}</Text>
  }

  if (mocaResponse.state === 'error') {
    return <Text>{mocaResponse.error}</Text>
  }

  const [data, otherData] = filterAndSort(
    response.data ?? [],
    'additionalTherapyDetail',
  )
  const initialValue = transformIn(
    data,
    bookedAppointmentResponse.data ?? [],
    visitType,
    diagnosisResponse?.data ?? [],
    mocaResponse?.data ?? [],
  )

  return (
    <Flex direction="column" width="100%">
      <AddOnWidget
        patientId={patientId}
        appointment={appointment.data}
        initialValue={initialValue}
        otherData={otherData}
      />
    </Flex>
  )
}

export { AddOnLoader }
