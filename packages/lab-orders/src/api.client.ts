import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import { LabTest, Problem, LabResultPayload, LabSearchPayload, ResultData, StaffType, StaffTypeSearchPayload, RecordTypes, Diagnoses, SearchLabDignosisCod10Diagnoses, LabTestResult, Observation, getSpecimenTypes, SpecimenTypes, NewAppointment, LabOrder, DocumetTypeAgainstLaborderPayload, DocumentTypeAgainstLaborder, PatientTypes, PatientPayload, questResultPayload } from './types'

const getSearchProviders = (
): Promise<StaffType[]> =>
  handleRequest(
    fetch(
      `/galaxy/api/staff`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
const getSearchPatient = (
  payload: PatientPayload
): Promise<PatientTypes[]> =>
  handleRequest(
    fetch(
      `/galaxy/api/patients/search?includeInactive=false&includeTest=true&offset=0&orderBy=legalName desc`,
      {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify(payload || {}),
        headers: createHeaders(),
      },
    ),
  )
const getQuestResult = (
  payload: questResultPayload
): Promise<LabOrder[]> =>
  handleRequest(
    fetch(
      `/galaxy/api/labhl7logs/actions/questresults`,
      {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify(payload || {}),
        headers: createHeaders(),
      },
    ),
  )
const getSearchProvidersByName = (
  payload: StaffTypeSearchPayload
): Promise<StaffType[]> =>
  handleRequest(
    fetch(
      `/galaxy/api/staff/search`,
      {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify(payload || {}),
        headers: createHeaders(),
      },
    ),
  )
const findProvider = (
  staffId: string
): Promise<StaffType> =>
  handleRequest(
    fetch(
      `/galaxy/api/staff/${staffId}`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const getSearchTests = (
  payload: LabSearchPayload
): Promise<LabTest[]> =>
  handleRequest(
    fetch(
      `/galaxy/api/labcompendiums/actions/search`,
      {
        method: 'POST',
        body: JSON.stringify(payload || {}),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
const deleteDignosisAgainstLabOrder = (
  appointmentId: string,
  dignosisId: string | number,
  orderId: string,
): Promise<LabTest[]> =>
  handleRequest(
    fetch(
      `/galaxy/api/appointments/${appointmentId}/laborders/${orderId}/labdiagnoses/${dignosisId}`,
      {
        method: 'DELETE',
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
const deleteTestAgainstLabOrder = (
  appointmentId: string,
  testId: string,
  orderId: string,
): Promise<LabTest[]> =>
  handleRequest(
    fetch(
      `/galaxy/api/appointments/${appointmentId}/laborders/${orderId}/labtests/${testId}`,
      {
        method: 'DELETE',
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const deleteLabOrder = (
  { appointmentId, id }: { appointmentId: string, id: string }
): Promise<LabTest[]> =>
  handleRequest(
    fetch(
      `/galaxy/api/appointments/${appointmentId}/laborders/${id}`,
      {
        method: 'DELETE',
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
const getProblems = (patientId: string): Promise<Problem[]> =>
  handleRequest(
    fetch(`/galaxy/api/healthproblems/actions/search?offset=0&limit=10`, {
      method: 'POST',
      body: JSON.stringify({ patientIds: [patientId], recordStatuses: ["Active"] }),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
const getLabLocation = (): Promise<RecordTypes[]> =>
  handleRequest(
    fetch(`/galaxy/api/labs/actions/search`, {
      method: 'POST',
      body: JSON.stringify({ recordStatuses: ["Active"] }),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
const getDiagnosis = (appointmentId: string, orderId: string): Promise<Diagnoses[]> =>
  handleRequest(
    fetch(`/galaxy/api/appointments/${appointmentId}/laborders/${orderId}/labdiagnoses/actions/search`, {
      method: 'POST',
      body: JSON.stringify({ orderId, recordStatuses: ["Active"] }),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
const addLabOrder = (appointmentId: string, payload: LabTest): Promise<LabTest> =>
  handleRequest(
    fetch(`/galaxy/api/appointments/${appointmentId}/laborders`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
const updateLabOrder = (id: string, appointmentId: string, payload: LabOrder): Promise<LabOrder> =>
  handleRequest(
    fetch(`/galaxy/api/appointments/${appointmentId}/laborders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
const addLabTests = (payload: LabTest[]): Promise<LabTest[]> =>
  handleRequest(
    fetch(`/galaxy/api/labtests/actions/updaterange`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
const addLabDiagnoses = (payload: Diagnoses[]): Promise<Diagnoses[]> =>
  handleRequest(
    fetch(`/galaxy/api/labdiagnoses/actions/updaterange`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
const searchLabDiagnoses = (payload: { codeOrDescription: string, recordStatuses: string[] }): Promise<SearchLabDignosisCod10Diagnoses[]> =>
  handleRequest(
    fetch(`/galaxy/api/metadata/icd10codes/actions/search?offset=0&limit=10`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
const addLabTestSpecimen = (testId: string, payload: SpecimenTypes): Promise<SpecimenTypes> =>
  handleRequest(
    fetch(`/galaxy/api/labtests/${testId}/labspecimens`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
const AddLabTestResult = (appointmentId: string, orderId: string, payload: ResultData): Promise<ResultData> =>
  handleRequest(
    fetch(`/galaxy/api/appointments/${appointmentId}/laborders/${orderId}/labresults`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
const getLabTestResult = (appointmentId: string, orderId: string, payload: LabTestResult): Promise<Observation[]> =>
  handleRequest(
    fetch(`/galaxy/api/appointments/${appointmentId}/laborders/${orderId}/labresults/actions/search`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
const getSpecimen = async (assigningAuthorityNamespace: string, SpecimenType: string,): Promise<getSpecimenTypes> =>
  handleRequest(
    fetch(`/galaxy/api/codeset/authorities/${assigningAuthorityNamespace}/codesets/${SpecimenType}?includeExtraDetails=false&offset=0&limit=0&orderBy=displayName%20asc`, {
      method: 'GET',
      headers: createHeaders(),
    }),
  )
const getDocumnetAgainstLaborder = async (appointmentId: string, orderId: string, documentName: string): Promise<string> => {
  const response = await fetch(`/galaxy/api/appointments/${appointmentId}/laborders/${orderId}/documents/${documentName}`, {
    cache: 'no-store',
    headers: createHeaders(),
  })

  if (response.ok) {
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    return url
  }

  return 'Result not found'
}
const getDocumentDetailAgainstLaborder = async (appointmentId: string, orderId: string, payload: DocumetTypeAgainstLaborderPayload): Promise<DocumentTypeAgainstLaborder[]> =>
  handleRequest(
    fetch(`/galaxy/api/appointments/${appointmentId}/laborders/${orderId}/documents/actions/search?offset=0&limit=0&orderBy=createdOn%20desc`, {
      method: 'POST',
      body: JSON.stringify(payload || {}),
      headers: createHeaders(),
    }),
  )
const fetchTestPills = (
  payload?: LabResultPayload
): Promise<LabTest[]> =>
  handleRequest(
    fetch(
      `/galaxy/api/labtests/actions/search?orderBy=testCodeCount`,
      {
        method: 'POST',
        body: JSON.stringify(payload || {}),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
const fetchSpecimenAgainstLabOrder = (
  appointmentId: string,
  orderId: string,
  payload?: LabResultPayload
): Promise<SpecimenTypes[]> =>
  handleRequest(
    fetch(
      `/galaxy/api/appointments/${appointmentId}/laborders/${orderId}/labspecimens/actions/search`,
      {
        method: 'POST',
        body: JSON.stringify(payload || {}),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
const updateSpcimenAgainstLabOrder = (
  appointmentId: string,
  orderId: string,
  specimenId: string,
  payload?: SpecimenTypes
): Promise<SpecimenTypes> =>
  handleRequest(
    fetch(
      `/galaxy/api/appointments/${appointmentId}/laborders/${orderId}/labspecimens/${specimenId}`,
      {
        method: 'PUT',
        body: JSON.stringify(payload || {}),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
const deleteSpecimenAgainstLabOrder = (
  appointmentId: string,
  orderId: string,
  specimenId: string,
): Promise<LabTest[]> =>
  handleRequest(
    fetch(
      `/galaxy/api/appointments/${appointmentId}/laborders/${orderId}/labspecimens/${specimenId}`,
      {
        method: 'DELETE',
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
const deleteResultAgainstLabOrderTest = (
  appointmentId: string,
  orderId: string,
  labResultId: string,
): Promise<ResultData> =>
  handleRequest(
    fetch(
      `/galaxy/api/appointments/${appointmentId}/laborders/${orderId}/labresults/${labResultId}`,
      {
        method: 'DELETE',
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
const updateResultAgainstLabOrderTest = (
  appointmentId: string,
  orderId: string,
  labResultId: string,
  payload: ResultData,
): Promise<ResultData> =>
  handleRequest(
    fetch(
      `/galaxy/api/appointments/${appointmentId}/laborders/${orderId}/labresults/${labResultId}`,
      {
        method: 'PUT',
        body: JSON.stringify(payload || {}),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
const getProviderAgainstLabOrder = (
  appointmentId: string,
): Promise<NewAppointment> =>
  handleRequest(
    fetch(
      `/galaxy/api/appointments/${appointmentId}`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

export {
  getSearchPatient,
  getDiagnosis,
  getSearchTests,
  deleteLabOrder,
  getProblems,
  addLabOrder,
  addLabTests,
  addLabDiagnoses,
  searchLabDiagnoses,
  getSearchProviders,
  updateLabOrder,
  findProvider,
  addLabTestSpecimen,
  getSearchProvidersByName,
  getLabLocation,
  getSpecimen,
  AddLabTestResult,
  getLabTestResult,
  fetchTestPills,
  fetchSpecimenAgainstLabOrder,
  deleteSpecimenAgainstLabOrder,
  deleteDignosisAgainstLabOrder,
  deleteTestAgainstLabOrder,
  getProviderAgainstLabOrder,
  updateSpcimenAgainstLabOrder,
  deleteResultAgainstLabOrderTest,
  updateResultAgainstLabOrderTest,
  getDocumentDetailAgainstLaborder,
  getDocumnetAgainstLaborder,
  getQuestResult
}
