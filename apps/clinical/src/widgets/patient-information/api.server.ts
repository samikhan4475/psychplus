import { cache } from 'react'
import { type PatientParams } from '@psychplus/patient'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import { RaceAndEthnicityCodeSet, AuthorityNameSpace, Patient } from './types'

const getPatientInformation = ({
  patientId,
}: PatientParams): Promise<Patient> =>
  handleRequest(
    fetch(`${API_URL}/api/patients/${patientId}/profile`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getRaceAndEthnicityCodeSets = (): Promise<RaceAndEthnicityCodeSet> => {
  return handleRequest(
    fetch(`${API_URL}/api/codeset/authorities/cdc/codesets/PH_RaceAndEthnicity_CDC`, {
      cache: 'no-store',
      headers: createHeaders(),
    })
  )
}

const getUsStatesCodeSets = (): Promise<RaceAndEthnicityCodeSet> => {
  return handleRequest(
    fetch(`${API_URL}/api/codeset/authorities/psychpluspublic/codesets/UsStates`, {
      cache: 'no-store',
      headers: createHeaders(),
    })
  )
}

const getDegreeCodeSets = (): Promise<RaceAndEthnicityCodeSet> => {
  return handleRequest(
    fetch(`${API_URL}/api/codeset/authorities/HL7v2/codesets/Degree?includeExtraDetails=false`, {
      cache: 'no-store',
      headers: createHeaders(),
    })
  )
}

const getHl7v3CodeSets = (): Promise<AuthorityNameSpace[]> => 
 handleRequest(
  fetch(`${API_URL}/api/codeset/actions/search`, {
    cache: 'no-store',
    headers: createHeaders(),
    method: 'POST',
    body: JSON.stringify({
      isIncludeMetadataResourceChangeControl: false,
      isIncludeMetadataResourceIds: false,
      isIncludeMetadataResourceStatus: false,
      isIncludeMetadataPermissions: false,
      isIncludeCodesets: true,
      isIncludeCodes: true,
      isIncludeCodeAttributes: true,
      namespace: "hl7v3"
    })
  })
 )

const getRaceAndEthnicityCodeSetsCached = cache(getRaceAndEthnicityCodeSets)

const getPatientInformationCached = cache(getPatientInformation)

const getUsStatesCodeSetsCached = cache(getUsStatesCodeSets)

const getHl7v3CodeSetsCached = cache(getHl7v3CodeSets)

const getDegreeCodeSetsCached = cache(getDegreeCodeSets)

export { 
  getPatientInformationCached as getPatientInformation,
  getRaceAndEthnicityCodeSetsCached as getRaceAndEthnicityCodeSets,
  getUsStatesCodeSetsCached as getUsStatesCodeSets,
  getHl7v3CodeSetsCached as getHl7v3CodeSets,
  getDegreeCodeSetsCached as getDegreeCodeSets,
}
