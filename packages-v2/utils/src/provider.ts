import { ProviderType, NewProviderType } from '@psychplus-v2/constants'

const PROVIDER_TYPE_LABELS: Record<ProviderType, string> = {
  [ProviderType.Psychiatrist]: 'Psychiatrist',
  [ProviderType.Therapist]: 'Therapy',
}

const NEW_PROVIDER_TYPE_LABELS: Record<NewProviderType, string> = {
  [NewProviderType.Psychiatrist]: 'Psychiatrist',
  [NewProviderType.Therapy]: 'Therapy',
  [NewProviderType.NotSet]: 'Not Set',
  [NewProviderType.Bcba]: 'Board Certified Behavior Analyst',
  [NewProviderType.FamilyMedicine]: 'Family Medicine',
  [NewProviderType.Pmnr]: 'PMNR',
  [NewProviderType.InternalMedicine]: 'Internal Medicine',
  [NewProviderType.Anesthesiology]: 'Anesthesiology',
}

const getProviderTypeLabel = (provider: ProviderType) => {
  return PROVIDER_TYPE_LABELS[provider]
}

const getNewProviderTypeLabel = (provider: NewProviderType | string) => {
  if (Object.values(NewProviderType).includes(provider as NewProviderType)) {
    return NEW_PROVIDER_TYPE_LABELS[provider as NewProviderType];
  }
  // Fallback for unmatched strings
  return 'Unknown Provider Type';
}

export { getProviderTypeLabel, getNewProviderTypeLabel }
