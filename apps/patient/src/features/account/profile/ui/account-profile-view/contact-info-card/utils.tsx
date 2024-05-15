import type { PatientAddress } from '@psychplus-v2/types'
import { Flex, Text } from '@radix-ui/themes'

const renderAddressLabels = (addresses?: PatientAddress[]) => {
  if (!addresses) {
    return undefined
  }

  const homeAddress = addresses.find((addr) => addr.type === 'Home')
  const mailingAddress = addresses.find((addr) => addr.type === 'Mailing')

  const primaryAddressLabel = renderAddressLabel(homeAddress)
  const secondaryAddressLabel = renderAddressLabel(mailingAddress)

  if (!primaryAddressLabel && !secondaryAddressLabel) {
    return undefined
  }

  return (
    <Flex direction="column" gap="2">
      {primaryAddressLabel}
      {secondaryAddressLabel}
    </Flex>
  )
}

const renderAddressLabel = (
  address?: Omit<Partial<PatientAddress>, 'country'>,
) => {
  if (
    !address ||
    !address.street1 ||
    !address.city ||
    !address.state ||
    !address.state ||
    !address.postalCode
  ) {
    return undefined
  }

  let firstLine = `${address.street1}`
  firstLine += address.type === 'Home' ? ' (Primary)' : ' (Mailing)'

  const secondLine = `${address.city}, ${address.state} ${address.postalCode}`

  return (
    <Flex direction="column">
      <Text>{firstLine}</Text>
      {address.street2 ? <Text>{address.street2}</Text> : null}
      <Text>{secondLine}</Text>
    </Flex>
  )
}

export { renderAddressLabels }
