import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import type { CvxCodes, Immunization, ImmunizationPayload } from './types'

const getImmunization = (appointmentId: string): Promise<Immunization[]> =>
  handleRequest(
    fetch(
      `/galaxy/api/appointments/${appointmentId}/immunizations/actions/search?offset=0&limit=0&orderBy=datetimeAdministered%20desc`,
      {
        method: 'POST',
        body: JSON.stringify({ resourceStatusList: ['Active'] }),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const createImmunization = ({
  payload,
  appointmentId,
}: ImmunizationPayload): Promise<Immunization> => {
  const cleanData = Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined,
    ),
  )
  cleanData.appointmentId = appointmentId
  return handleRequest(
    fetch(`/galaxy/api/appointments/${appointmentId}/immunizations`, {
      method: 'POST',
      body: JSON.stringify(cleanData),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
}

const deleteImmunization = (
  appointmentId: number,
  immunizationId: string | undefined,
): Promise<void> =>
  handleRequest(
    fetch(
      `/galaxy/api/appointments/${appointmentId}/immunizations/${immunizationId}`,
      {
        method: 'DELETE',
        body: JSON.stringify({}),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const UpdateImmunization = ({
  payload,
  appointmentId,
}: ImmunizationPayload): Promise<Immunization> =>
  handleRequest(
    fetch(
      `/galaxy/api/appointments/${appointmentId}/immunizations/${payload.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(payload),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const getCvxCodes = (cvxCode: string): Promise<CvxCodes[]> =>
  handleRequest(
    fetch(`/galaxy/api/immunizations/actions/searchcvx/${cvxCode}`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

export {
  getImmunization,
  createImmunization,
  UpdateImmunization,
  deleteImmunization,
  getCvxCodes,
}
