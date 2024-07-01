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
} from './api.server'
import { PatientInformationWidgetClient } from './patient-information-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

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
      <PatientInformationWidgetClient>
        {/* TODO: LinkAccountWidget will be implemented in future */}
        {/* <LinkAccountWidget patientId={patientId} /> */}
        <PreferredPartnersWidget patientId={patientId} />
        <PatientRelationshipWidget patientId={patientId} />
      </PatientInformationWidgetClient>
    </>
  )
}

export { PatientInformationWidgetServer, type PatientInformationWidgetProps }
