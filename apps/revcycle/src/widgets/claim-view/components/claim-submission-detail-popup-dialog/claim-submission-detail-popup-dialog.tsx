import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { useStore } from '../../store'
import { getClaimErrorById } from '../../utils'
import { ClaimSubmissionPopupBody } from '../claim-submission-popup-dialog/claim-submission-popup-body'

const ClaimSubmissionDetailPopupDialog = () => {
  const claimSubmissionData = useStore((state) => state.claimSubmissionData)
  const selectedClaim = useStore((state) => state.selectedClaim)
  const successClaims = claimSubmissionData.cleanClaimIds.includes(
    selectedClaim,
  )
    ? [selectedClaim]
    : []
  const errorClaims = getClaimErrorById(
    selectedClaim,
    claimSubmissionData.claimsWithErrorMessages,
  )

  const claimSubmissionDetailModal = useStore(
    (state) => state.claimSubmissionDetailModal,
  )
  const { setClaimSubmissionDetailModal } = useStore((state) => ({
    setClaimSubmissionDetailModal: state.setClaimSubmissionDetailModal,
  }))

  return (
    <Dialog.Root
      open={claimSubmissionDetailModal}
      onOpenChange={setClaimSubmissionDetailModal}
    >
      <Dialog.Content className="max-w-[600px] rounded-[0px]">
        <Dialog.Title>
          Claim Submission Detail
          <Button
            className="float-right cursor-pointer bg-transparent text-[#000]"
            onClick={() => setClaimSubmissionDetailModal(false)}
          >
            X
          </Button>
        </Dialog.Title>
        <ClaimSubmissionPopupBody
          errorClaims={errorClaims ?? {}}
          successClaims={successClaims}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ClaimSubmissionDetailPopupDialog }
