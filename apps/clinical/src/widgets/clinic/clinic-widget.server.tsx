import { unstable_noStore as noStore } from 'next/cache'
import { getCodeSets } from '@psychplus/codeset/api.server'
import { getUsStatesCodeSets } from '@psychplus/patient-info/api.server'
import {
  getCommonLanguages,
  searchProviders,
} from './api.server'
import { ClinicWidgetClient } from './clinic-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'
import { searchAppointmentsAction } from './search-appointments'

const ClinicWidgetServer = async () => {
  noStore()
  const [
    usStatesCodeSet,
    codeSets,
    languagesCodeSet,
    providers,
    serverAppointments,
  ] = await Promise.all([
    getUsStatesCodeSets(),
    getCodeSets(),
    getCommonLanguages(),
    searchProviders(),
    searchAppointmentsAction(),
  ])

  return (
    <>
      <Preloader
        store={useStore}
        usStatesCodeSet={usStatesCodeSet}
        codeSets={codeSets}
        languagesCodeSet={languagesCodeSet}
        providers={providers}
        appointmentAvailabilitiesServer={serverAppointments}
      />
      <ClinicWidgetClient />
    </>
  )
}

export { ClinicWidgetServer }
