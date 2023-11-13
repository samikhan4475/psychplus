import { type PatientStoreType } from './store'

const usePatient = (store: PatientStoreType) => {
  const patient = store().patient

  if (!patient) {
    throw new Error()
  }
  return patient
}

export { usePatient }
