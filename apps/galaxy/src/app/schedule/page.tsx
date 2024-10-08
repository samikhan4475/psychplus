import * as api from '@/api'
import { ScheduleView } from '@/ui/schedule'
import {
  getClinicsOptionsAction,
  getProvidersOptionsAction,
} from '@/ui/schedule/actions'
import { DropdownContextProvider } from '@/ui/schedule/context'

const SchedulePage = async () => {
  const [insurancePlans, usStates, providers, clinics] = await Promise.all([
    api.getInsurancePlansAction(),
    api.getUsStatesAction(),
    getProvidersOptionsAction(),
    getClinicsOptionsAction(),
  ])

  return (
    <DropdownContextProvider
      insurancePlans={insurancePlans}
      usStates={usStates}
      providers={providers}
      clinics={clinics}
    >
      <ScheduleView />
    </DropdownContextProvider>
  )
}

export default SchedulePage
