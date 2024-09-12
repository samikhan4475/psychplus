import { CrossCircledIcon } from '@radix-ui/react-icons'
import { Text } from '@radix-ui/themes'
import { useStore } from '../../store'

interface TableCellLongTextProps {
  claimId: string
}

const ClaimActionIcon = ({ claimId }: TableCellLongTextProps) => {
  const { setSelectedClaim, setClaimSubmissionRejectionDetailModal } = useStore(
    (state) => ({
      setSelectedClaim: state.setSelectedClaim,
      setClaimSubmissionRejectionDetailModal:
        state.setClaimSubmissionRejectionDetailModal,
    }),
  )

  const onSelectClaim = () => {
    setSelectedClaim(claimId)
    setClaimSubmissionRejectionDetailModal(true)
  }

  return (
    <Text onClick={onSelectClaim}>
      <CrossCircledIcon className="ml-[3px] cursor-pointer text-[#e5484d]" />
    </Text>
  )
}

export { ClaimActionIcon }
