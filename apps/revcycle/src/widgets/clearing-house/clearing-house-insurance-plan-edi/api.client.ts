import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import { EDIItem, InsurancePayer } from './components/types'

const getEDIData = async (body = {}): Promise<EDIItem[]> =>
  handleRequest(
    fetch(
      `/revcycle/api/integrationconfiguration/insuranceplans/actions/search`,
      {
        headers: createHeaders(),
        method: 'POST',
        body: JSON.stringify(body),
      },
    ),
  )

const addInsurancePlanEDIRecord = async (body = {}) =>
  handleRequest(
    fetch(`/revcycle/api/integrationconfiguration/insuranceplans`, {
      headers: createHeaders(),
      method: 'POST',
      body: JSON.stringify(body),
    }),
  )

const updateInsurancePlanEDIRecord = async (
  id: string | null | undefined,
  body = {},
) =>
  handleRequest(
    fetch(`/revcycle/api/integrationconfiguration/insuranceplans/${id}`, {
      headers: createHeaders(),
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  )

const deleteInsurancePlanEDIRecord = async (id: string | null | undefined) =>
  handleRequest(
    fetch(`/revcycle/api/integrationconfiguration/insuranceplans/${id}`, {
      headers: createHeaders(),
      method: 'DELETE',
    }),
  )

const getInsurancePayerData = async (): Promise<InsurancePayer[]> =>
  handleRequest(
    fetch(`/revcycle/api/insurance/payers?includePlans=true`, {
      headers: createHeaders(),
      method: 'GET',
    }),
  )

export {
  getEDIData,
  addInsurancePlanEDIRecord,
  updateInsurancePlanEDIRecord,
  deleteInsurancePlanEDIRecord,
  getInsurancePayerData,
}
