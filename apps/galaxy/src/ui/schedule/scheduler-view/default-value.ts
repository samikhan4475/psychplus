const getDefaultValues = (providerId?: string) => ({
    startingDate: undefined,
    endingDate: undefined,
    stateIds: [],
    locationIds: [],
    serviceIds: [],
    visitTypeCode: [],
    staffIds: providerId ? [providerId]: [],
    providerTypes: [],
    gender: '',
    language: '',
    type: '',
  })

  export { getDefaultValues }