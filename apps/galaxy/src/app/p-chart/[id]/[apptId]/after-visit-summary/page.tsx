import { Text } from '@radix-ui/themes'
import { getAppointments, getPastAppointments } from '@/api'
import { ReferralStatuses } from '@/types'
import { AfterVisitSummaryView } from '@/ui/after-visit-summary'
import { searchPatientReferralsAction } from '@/ui/referrals/patient-referrals-widget/actions'

interface AfterVisitSummaryProps {
  params: {
    id: string
  }
  searchParams: {
    id: string
    visitType: string
  }
}
const defaultPayload = {
  includePatientData: true,
  includeLocation: true,
  includeStaff: true,
  includeSpecialist: true,
  includeEncounterTypes: true,
}

const AfterVisitSummary = async ({
  params,
  searchParams,
}: AfterVisitSummaryProps) => {
  const [appointments, referrals, pastAppointments] = await Promise.all([
    getAppointments({ patientIds: [params.id], ...defaultPayload }),
    searchPatientReferralsAction({
      patientIds: [params.id],
      payload: {
        resourceStatusList: [
          ReferralStatuses.Completed,
          ReferralStatuses.Incomplete,
          ReferralStatuses.Pending,
        ],
      },
    }),
    getPastAppointments(params.id),
  ])

  if (appointments.state === 'error') {
    return <Text>Appointments with {params.id} not found</Text>
  }
  if (referrals.state === 'error') {
    return <Text>Referrals with {params.id} not found</Text>
  }
  if (pastAppointments.state === 'error') {
    return <Text>Past appointments with {params.id} not found</Text>
  }
  return (
    <AfterVisitSummaryView
      patientId={params.id}
      appointments={appointments.data}
      referrals={referrals.data.referrals}
      appointmentId={searchParams.id}
      pastAppointments={pastAppointments.data}
    />
  )
}

export default AfterVisitSummary
