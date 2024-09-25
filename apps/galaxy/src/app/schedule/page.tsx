import * as api from '@/api'
import { ScheduleView } from '@/ui/schedule'

const SchedulePage = async () => {
  const [insurancePlans, usStates] = await Promise.all([
    api.getInsurancePlansAction(),
    api.getUsStatesAction(),
  ])

  return <ScheduleView insurancePlans={insurancePlans} usStates={usStates} />
}

export default SchedulePage
