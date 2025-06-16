import { AppointmentType, ProviderType } from '@psychplus-v2/constants'
import { LocationProviders } from '.'

interface TransformLocationProvidersParams {
  response: LocationProviders[]
  providerType: ProviderType
  providerTypeLabel: string
  appointmentType?: AppointmentType
}

type Comparator<T> = (a: T, b: T) => number

interface LocationProvidersPayloadParams {
  appointmentType: AppointmentType
  providerType?: ProviderType
  providerTypeLabel?: string
  zipCode?: string
  stateCode?: string
  maxDistanceInMiles?: string
}

export type {
  TransformLocationProvidersParams,
  LocationProvidersPayloadParams,
  Comparator,
}
