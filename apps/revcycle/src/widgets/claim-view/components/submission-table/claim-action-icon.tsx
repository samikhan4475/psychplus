import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { Text } from '@radix-ui/themes'
import { useStore } from '../../store'

interface TableCellLongTextProps {
  claimId: string
}

const ClaimActionIcon = ({ claimId }: TableCellLongTextProps) => {
  const claimSubmissionData = useStore((state) => state.claimSubmissionData)
  const { setSelectedClaim, setClaimSubmissionDetailModal } = useStore(
    (state) => ({
      setSelectedClaim: state.setSelectedClaim,
      setClaimSubmissionDetailModal: state.setClaimSubmissionDetailModal,
    }),
  )

  const onSelectClaim = () => {
    setSelectedClaim(claimId)
    setClaimSubmissionDetailModal(true)
  }

  if (
    Object.keys(claimSubmissionData.claimsWithErrorMessages).includes(claimId)
  ) {
    return (
      <Text onClick={onSelectClaim}>
        <CrossCircledIcon className="ml-[3px] cursor-pointer text-[#e5484d]" />
      </Text>
    )
  } else if (claimSubmissionData.cleanClaimIds.includes(claimId)) {
    return (
      <Text onClick={onSelectClaim}>
        <CheckCircledIcon className="ml-[3px] cursor-pointer  text-[#31a46c]" />
      </Text>
    )
  }

  return <></>
}

export { ClaimActionIcon }
