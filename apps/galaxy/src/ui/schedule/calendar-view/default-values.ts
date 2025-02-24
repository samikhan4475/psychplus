const getDefaultValues = (providerId?: string) => ({
  startingDate: undefined,
  endingDate: undefined,
  stateIds: [],
  locationIds: [],
  serviceIds: [],
  providerIds: providerId ?? '',
  visitMedium: '',
  providerType: '',
  gender: '',
  providerLanguage: '',
})

export { getDefaultValues }
