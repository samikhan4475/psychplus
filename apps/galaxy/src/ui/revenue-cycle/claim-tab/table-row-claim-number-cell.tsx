import { CrossCircledIcon } from '@radix-ui/react-icons'
import { Box, Text } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Claim } from '@/types'
import { ClaimSubmissionDialog } from '../dialogs'
import { useStore } from './store'

const ClaimNumberCell = ({ row: { original: claim } }: PropsWithRow<Claim>) => {
  const claims = useStore((state) => state.claimsListData?.claims)
  return (
    <Box className="inline-flex">
      <Text
        size="1"
        className="flex max-w-[200px] items-center overflow-hidden whitespace-nowrap"
      >
        {claim.claimNumber}
        {claim.isSystemRejected && (
          <ClaimSubmissionDialog claims={claims} claimId={claim.id}>
            <CrossCircledIcon className="ml-1 cursor-pointer text-[#e5484d]" />
          </ClaimSubmissionDialog>
        )}
      </Text>
    </Box>
  )
}
export { ClaimNumberCell }
