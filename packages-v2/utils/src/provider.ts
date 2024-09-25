import { ProviderType } from '@psychplus-v2/constants'

const PROVIDER_TYPE_LABELS: Record<ProviderType, string> = {
  [ProviderType.Psychiatrist]: 'Psychiatry',
  [ProviderType.Therapist]: 'Therapy',
}

const getProviderTypeLabel = (provider: ProviderType) => {
  return PROVIDER_TYPE_LABELS[provider]
}

export { getProviderTypeLabel }
