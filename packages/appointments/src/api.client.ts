import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import {
  AppointmentAvailabilityPayload,
  BookAppointmentPayload,
  Card,
  Cards,
  InsurancePayer,
  InsurancePayers,
  PatientPolicy,
  PolicyCardRequest,
  StaffAppointmentAvailabilities,
} from '.'

const getAppointmentAvailabilityForUnauthenticatedUser = async (
  request: AppointmentAvailabilityPayload,
): Promise<StaffAppointmentAvailabilities> =>
  handleRequest(
    fetch(
      '/api/appointments/availability/search/unauthenticated?offset=0&limit=0&includeDistance=true',

      {
        method: 'POST',
        body: JSON.stringify(request),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const getAppointmentAvailabilityForUnauthenticatedUserCached = cache(
  getAppointmentAvailabilityForUnauthenticatedUser,
)

const bookAppointment = async (request: BookAppointmentPayload) =>
  handleRequest(
    fetch('/api/appointments/book', {
      method: 'POST',
      body: JSON.stringify(request),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const fetchCreditCards = async (): Promise<Cards> =>
  handleRequest(
    fetch('/api/patients/self/creditcards', {
      headers: createHeaders(),
    }),
  )

const fetchCreditCardsCached = cache(fetchCreditCards)

const addCreditCard = async (request: Card): Promise<Card> =>
  handleRequest(
    fetch('/api/patients/self/creditcards', {
      method: 'POST',
      body: JSON.stringify(request),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const fetchInsurancePayers = async (): Promise<InsurancePayers> =>
  handleRequest(
    fetch('/api/insurance/payers', {
      headers: createHeaders(),
    }),
  )

const fetchInsurancePayersCached = cache(fetchInsurancePayers)

const fetchInsurancePayer = async (payerId: string): Promise<InsurancePayer> =>
  handleRequest(
    fetch(`/api/insurance/payers/${payerId}`, {
      headers: createHeaders(),
    }),
  )

const fetchInsurancePayerCached = cache(fetchInsurancePayer)

const submitPatientPolicy = async (
  request: PatientPolicy,
): Promise<PatientPolicy> =>
  handleRequest(
    fetch('/api/patients/self/policies', {
      method: 'POST',
      body: JSON.stringify(request),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const submitPatientPolicyCard = async (
  request: PolicyCardRequest,
): Promise<PatientPolicy> => {
  const formData = new FormData()
  formData.append('file', request.image)

  return handleRequest(
    fetch(
      `/api/patients/self/policies/${request.policyId}/cardimage/${request.cardSide}`,
      {
        method: 'PATCH',
        body: formData,
        cache: 'no-store',
        headers: {
          ...createHeaders(),
        },
      },
    ),
  )
}

export {
  getAppointmentAvailabilityForUnauthenticatedUserCached as getAppointmentAvailabilityForUnauthenticatedUser,
  bookAppointment,
  fetchCreditCardsCached as fetchCreditCards,
  addCreditCard,
  fetchInsurancePayersCached as fetchInsurancePayers,
  fetchInsurancePayerCached as fetchInsurancePayer,
  submitPatientPolicy,
  submitPatientPolicyCard,
}
