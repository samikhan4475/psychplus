import { Flex, Text } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Claim } from '@/types'

interface ClaimNumberCellProps extends PropsWithRow<Claim> {
  handlePaymentPostingClaim: (claim: Claim) => void
}
const ClaimNumberCell = ({
  row: { original: claim },
  handlePaymentPostingClaim,
}: ClaimNumberCellProps) => {
  return (
    <Flex height="100%" align="center">
      <Text
        onClick={() => handlePaymentPostingClaim(claim)}
        className="text-blue-10"
        weight="regular"
        size="1"
      >
        {claim.claimNumber}
      </Text>
    </Flex>
  )
}

export { ClaimNumberCell }
