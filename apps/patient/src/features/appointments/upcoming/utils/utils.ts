import { Address } from '@psychplus-v2/types'

const getClinicAddressDirectionMapUrl = (addresses?: Address[]) => {
  const address = addresses?.[0]

  if (!address) return ''

  const query = encodeURIComponent(
    `${address.street1}, ${address.city}, ${address.state} ${address.postalCode}`,
  )

  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

export { getClinicAddressDirectionMapUrl }
