import * as api from '@/api'
import { InsurancePlan } from '@/types'

const getInsurancePlansAction = async (): Promise<
  { label: string; value: string }[]
> => {
  const body = {}
  const response = await api.POST<InsurancePlan[]>(
    api.SEARCH_INSURANCE_PLANS_ENDPOINT,
    body,
  )

  if (response.state === 'error') {
    throw new Error(response.error)
  }

  const transformedData = response.data.map((data) => ({
    label: data.name,
    value: data.id,
  }))

  return transformedData
}

export { getInsurancePlansAction }
