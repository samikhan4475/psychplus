'use server'

import * as api from '@/api'
import { SelectOptionType } from '@/types'

const getFacilityAdmissionIdsOptionsAction = async (
  patientId?: number,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  // @TODO: API will be integrated in next phase, for now we have one default option
  return {
    state: 'success',
    data: [{ label: 'Create New', value: 'createNew' }],
  }
}

export { getFacilityAdmissionIdsOptionsAction }
