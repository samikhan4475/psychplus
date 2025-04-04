import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { Box, Text } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Claim } from '@/types'
import { ClaimSubmissionDialog } from '../dialogs'
import { useStore as ClaimStore } from '../store'
import { useStore } from './store'

const ClaimNumberCell = ({ row: { original: claim } }: PropsWithRow<Claim>) => {
  const claims = useStore((state) => state.claimsListData?.claims)
  const { setActiveTab, setSelectedClaimsData } = ClaimStore((state) => ({
    setActiveTab: state.setActiveTab,
    setSelectedClaimsData: state.setSelectedClaimsData,
  }))
  const onOpenClaim = () => {
    const claimTab = `Claim# ${claim.claimNumber}`
    setActiveTab(claimTab)
    setSelectedClaimsData(claimTab, {
      claimId: claim.id,
      claimStatus: claim.claimStatusCode,
      claimPrimaryStatus: claim.primaryStatusCode,
    })
  }

  return (
    <Box className="inline-flex">
      <Text
        onClick={onOpenClaim}
        size="1"
        className="text-pp-text-primary-base bg-white flex max-w-[200px] cursor-pointer items-center overflow-hidden whitespace-nowrap"
      >
        {claim.claimNumber}
      </Text>{' '}
      {claim.isSystemRejected && (
        <ClaimSubmissionDialog claims={claims} claimId={claim.id}>
          <CrossCircledIcon className="ml-1 cursor-pointer text-red-10" />
        </ClaimSubmissionDialog>
      )}
      {claim.isSubmitted && (
        <CheckCircledIcon className="ml-1 cursor-pointer text-green-10" />
      )}
    </Box>
  )
}
export { ClaimNumberCell }
