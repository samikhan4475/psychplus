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

function formattedDate(date: string | Date) {
  if (date) {
    const dateObj = new Date(date)

    return `${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj
      .getDate()
      .toString()
      .padStart(2, '0')}/${dateObj.getFullYear()}`
  }
  return date
}

export { adjustToUTC, getClaimErrorById, getClaimById, formattedDate }
