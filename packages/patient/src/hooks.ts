import { type PatientStoreType } from './store'

const usePatient = (store: PatientStoreType) => {
  const patient = store((state) => state.patient)

  if (!patient) {
    return null
  }
  return patient
}

const usePatientId = (store: PatientStoreType) => usePatient(store)?.id

export { usePatient, usePatientId }
