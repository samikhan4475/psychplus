'use server'

import * as api from '@/api'
import mockDrugsData from './mock-data-drugs.json'

interface DrugsData {
  name: string
  genericName: string
  type: string
  manufacturer: string[]
  doses: string[]
}

const getAddOnDrugs = async (
  value: string,
): Promise<api.ActionResult<DrugsData[]>> => {
  try {
    const response = mockDrugsData.filter((drug) =>
      drug.name.toLowerCase().includes(value.toLowerCase()),
    )

    return {
      state: 'success',
      data: response,
    }
  } catch (error) {
    return {
      state: 'error',
      error: 'An error occurred while fetching drug data.',
    }
  }
}

export { getAddOnDrugs }
