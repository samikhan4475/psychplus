import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import {
  ChargePayment,
  CreditCard,
  CreditCardPayload,
  CustomChargePayload,
  PatientInfo,
  PatientTransactionHistory,
  ServicesHistory,
  ServicesHistoryPayload,
  SubscriptionHistory,
  UnpaidAppointment,
  UnpaidAppointmentPayload,
} from './types'

const createPreferredPartnerCreditCard = (
  request: CreditCardPayload,
): Promise<void> =>
  handleRequest(
    fetch(
      `/revcycle/api/preferredpartners/${request.preferredPartnerId}/creditcards`,
      {
        method: 'POST',
        body: JSON.stringify(request),
        headers: createHeaders(),
      },
    ),
  )

const updatePreferredPartnerCreditCard = (request: CreditCard): Promise<void> =>
  handleRequest(
    fetch(
      `/revcycle/api/preferredpartners/${request.preferredPartnerId}/creditcards/${request.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(request),
        headers: createHeaders(),
      },
    ),
  )

const createCustomCharge = (request: CustomChargePayload): Promise<void> =>
  handleRequest(
    fetch(
      `/revcycle/api/preferredpartners/${request.preferredPartnerId}/transactions`,
      {
        method: 'POST',
        body: JSON.stringify(request),
        headers: createHeaders(),
      },
    ),
  )

const createPayment = (
  request: ChargePayment[],
  preferredPartnerId: string,
): Promise<void> =>
  handleRequest(
    fetch(
      `/revcycle/api/preferredpartners/${preferredPartnerId}/payments/actions/charge`,
      {
        method: 'POST',
        body: JSON.stringify(request),
        headers: createHeaders(),
      },
    ),
  )

const getSubscriptionsHistory = (
  preferredPartnerId: string,
): Promise<SubscriptionHistory[]> =>
  handleRequest(
    fetch(
      `/revcycle/api/preferredpartners/${preferredPartnerId}/subscriptions`,
      {
        method: 'POST',
        body: JSON.stringify({ preferredPartnerId }),
        headers: createHeaders(),
      },
    ),
  )

const getPreferredPartnerCards = (
  preferredPartnerId: string,
): Promise<CreditCard[]> =>
  handleRequest(
    fetch(`/revcycle/api/preferredpartners/${preferredPartnerId}/creditcards`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const deletePreferredPartnerCreditCard = (
  preferredPartnerId: string,
  cardId: number,
): Promise<void> =>
  handleRequest(
    fetch(
      `/revcycle/api/preferredpartners/${preferredPartnerId}/creditcards/${cardId}`,
      {
        method: 'DELETE',
        headers: createHeaders(),
      },
    ),
  )

const getPreferredPartnerServicesHistory = (
  request: ServicesHistoryPayload,
): Promise<ServicesHistory> =>
  handleRequest(
    fetch(
      `/revcycle/api/preferredpartners/${request.preferredPartnerId}/payments`,
      {
        method: 'POST',
        cache: 'no-store',
        headers: createHeaders(),
        body: JSON.stringify(request),
      },
    ),
  )

const getPatientDetail = (patientId: number): Promise<PatientInfo> =>
  handleRequest(
    fetch(`/revcycle/api/patients/${patientId}/profile`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getUnpaidAppointment = (
  request: UnpaidAppointmentPayload,
): Promise<UnpaidAppointment[]> =>
  handleRequest(
    fetch(
      `/revcycle/api/patients/${request.patientId}/appointments/actions/unpaid/${request.paymentType}`,
      {
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const getPatientTransactionHistory = (
  patientId: number,
): Promise<PatientTransactionHistory[]> =>
  handleRequest(
    fetch(`/revcycle/api/patients/${patientId}/transaction/actions/history`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const deleteServicesHistory = (
  preferredPartnerId: string,
  id: number,
): Promise<void> =>
  handleRequest(
    fetch(
      `/revcycle/api/preferredpartners/${preferredPartnerId}/transactions/${id}`,
      {
        method: 'DELETE',
        headers: createHeaders(),
      },
    ),
  )

export {
  createPreferredPartnerCreditCard,
  getPreferredPartnerCards,
  deletePreferredPartnerCreditCard,
  updatePreferredPartnerCreditCard,
  getPreferredPartnerServicesHistory,
  createCustomCharge,
  getSubscriptionsHistory,
  deleteServicesHistory,
  getPatientDetail,
  getUnpaidAppointment,
  createPayment,
  getPatientTransactionHistory,
}
