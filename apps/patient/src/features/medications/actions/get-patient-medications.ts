'use server'

import { ActionResult } from '@psychplus-v2/api'
import { getPatientMedications } from '../api'
import { PatientMedication } from '../types'

const getPatientMedicationsAction = async (): Promise<
  ActionResult<PatientMedication[]>
> => await getPatientMedications()

export { getPatientMedicationsAction }
