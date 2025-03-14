import { today } from '@internationalized/date'
import { Text } from '@radix-ui/themes'
import { getAppointments, getUserSettings } from '@/api'
import { VisitMediumEnum } from '@/enum'
import { CallView } from '@/ui/call'
import { getAcsInfo } from '@/ui/call/actions'
import { getDateString } from '@/ui/schedule/utils'
import { getAuthCookies } from '@/utils/auth'

const CallPage = async () => {
  const auth = getAuthCookies()

  const settingResponse = await getUserSettings({
    name: 'TimeZoneId',
  })

  const timeZoneSetting =
    settingResponse.state === 'success'
      ? settingResponse.data.find((s) => s.levelCode === 'User')?.content ||
        settingResponse.data?.[0]?.content
      : 'America/Chicago'

  const payload = {
    providerIds: [auth?.user.staffId as string],
    startingDate: getDateString(today(timeZoneSetting), timeZoneSetting),
    endingDate: getDateString(
      today(timeZoneSetting).add({ days: 1 }),
      timeZoneSetting,
    ),
    visitMediums: [VisitMediumEnum.TeleVisit],
    IncludePatientData: true,
    isShowActiveVisits: true,
  }

  const [acsResponse, appointments] = await Promise.all([
    getAcsInfo(),
    getAppointments(payload),
  ])

  if (acsResponse.state === 'error') {
    return <Text>Error while getting ACS{acsResponse.error}</Text>
  }

  if (appointments.state === 'error') {
    return <Text>Error While getting appointments: {appointments.error}</Text>
  }

  return (
    <CallView acsInfo={acsResponse.data} appointments={appointments.data} />
  )
}

export default CallPage
