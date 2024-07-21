import { unstable_noStore as noStore } from 'next/cache'
import { getCodeSets } from '@psychplus/codeset/api.server'
import { type PatientParams } from '@psychplus/patient'
import { getPatient } from '@psychplus/patient/api.server'
import { UserPreloader } from '@psychplus/user'
import { getUser } from '@psychplus/user/api.server'
import { PatientRelationshipWidget, PreferredPartnersWidget } from '@psychplus/widgets/clinical'
import {
  getDegreeCodeSets,
  getHl7v3CodeSets,
  getRaceAndEthnicityCodeSets,
  getUsStatesCodeSets,
} from '@psychplus/patient-info/api.server'
import { PatientInformationWidgetClient } from './patient-information-widget.client'
import { Preloader, useStore } from '@psychplus/patient-info'
import { GOOGLE_MAPS_API_KEY } from '@psychplus/utils/constants'

type PatientInformationWidgetProps = PatientParams

const PatientInformationWidgetServer = async ({
  patientId,
}: PatientInformationWidgetProps) => {
  noStore()
  const [
    user,
    codeSets,
    patient,
    raceAndEthnicityCodeSet,
    usStatesCodeSet,
    hl7v3CodeSets,
    degreeCodeSet,
  ] = await Promise.all([
    getUser(),
    getCodeSets(),
    getPatient({ patientId }),
    getRaceAndEthnicityCodeSets(),
    getUsStatesCodeSets(),
    getHl7v3CodeSets(),
    getDegreeCodeSets(),
  ])

  return (
    <>
      <UserPreloader user={user} store={[useStore]} />
      <Preloader
        store={useStore}
        user={user}
        codeSets={codeSets}
        patientProfile={patient}
        raceAndEthnicityCodeSet={raceAndEthnicityCodeSet}
        usStatesCodeSet={usStatesCodeSet}
        hl7v3CodeSets={hl7v3CodeSets}
        degreeCodeSets={degreeCodeSet}
      />
      <PatientInformationWidgetClient googleApiKey={GOOGLE_MAPS_API_KEY?? ''}>
        {/* TODO: LinkAccountWidget will be implemented in future */}
        {/* <LinkAccountWidget patientId={patientId} /> */}
        <PreferredPartnersWidget patientId={patientId} />
        <PatientRelationshipWidget patientId={patientId} />
      </PatientInformationWidgetClient>
    </>
  )
}

export { PatientInformationWidgetServer, type PatientInformationWidgetProps }
