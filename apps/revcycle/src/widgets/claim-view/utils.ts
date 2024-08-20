import { Claim, ErrorMessage } from './types'

const getClaimErrorById = (
  selectedClaim: string,
  claimsWithErrorMessages: {
    [claimId: string]: ErrorMessage[]
  },
) => {
  const response: {
    [claimId: string]: ErrorMessage[]
  } = {}
  if (Object.keys(claimsWithErrorMessages).includes(selectedClaim)) {
    response[selectedClaim] = claimsWithErrorMessages[selectedClaim]
  }
  return response
}

const getClaimById = (claimId: string, claimsList: Claim[]) => {
  return claimsList.find((element) => element.id === claimId)
}

function adjustToUTC(date: string | Date) {
  const localDate = new Date(date)
  const timezoneOffset = localDate.getTimezoneOffset() * 60000
  const utcDate = new Date(localDate.getTime() - timezoneOffset)

  return utcDate
}

export { adjustToUTC, getClaimErrorById, getClaimById }
