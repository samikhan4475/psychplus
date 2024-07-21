import { unstable_noStore as noStore } from 'next/cache'
import { PatientParams } from '@psychplus/patient'
import { getPatient, getPatientHistory } from '@psychplus/patient/api.server'
import { Preloader } from './preloader'
import { useStore } from './store'
import { PatientHistoryWidgetClient } from './patient-history-widget.client'
import { getCodeSets } from '@psychplus/codeset/api.server'
import { getDegreeCodeSets, getHl7v3CodeSets, getRaceAndEthnicityCodeSets, getUsStatesCodeSets } from '@psychplus/patient-info/api.server'

type PatientHistoryWidgetProps = PatientParams

const PatientHistoryWidgetServer = async ({
  patientId,
}: PatientHistoryWidgetProps) => {
  noStore()

  const [patient, patientHistory, codeSets, raceAndEthnicityCodeSet, usStatesCodeSet, degreeCodeSet, hl7v3CodeSets] = await Promise.all([
    getPatient({ patientId }),
    getPatientHistory({ patientId }),
    getCodeSets(),
    getRaceAndEthnicityCodeSets(),
    getUsStatesCodeSets(),
    getDegreeCodeSets(),
    getHl7v3CodeSets(),
  ])

  return (
    <>
      <Preloader
        store={useStore}
        patientProfile={patient}
        patientHistory={patientHistory}
        codeSets={codeSets}
        raceAndEthnicityCodeSet={raceAndEthnicityCodeSet}
        usStatesCodeSet={usStatesCodeSet}
        degreeCodeSet={degreeCodeSet}
        hl7v3CodeSets={hl7v3CodeSets}
      />
      <PatientHistoryWidgetClient />
    </>
  )
}

export { PatientHistoryWidgetServer, type PatientHistoryWidgetProps }
