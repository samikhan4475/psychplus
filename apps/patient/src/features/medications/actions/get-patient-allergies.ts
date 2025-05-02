'use server'

import { ActionResult } from '@psychplus-v2/api'
import { getPatientAllergies } from '../api'
import { AllergyDataResponse } from '../types'

const getPatientAllergiesAction = async (): Promise<
  ActionResult<AllergyDataResponse[]>
> => await getPatientAllergies()

export { getPatientAllergiesAction }
