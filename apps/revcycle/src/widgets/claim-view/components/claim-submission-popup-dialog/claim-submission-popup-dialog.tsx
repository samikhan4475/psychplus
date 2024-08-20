import { Box, Flex } from '@radix-ui/themes'
import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { useStore } from '../../store'
import { ClaimReportSvg } from '../../svg'
import { ClaimSubmissionPopupBody } from './claim-submission-popup-body'

const ClaimSubmissionPopupDialog = () => {
  const claimSubmissionData = useStore((state) => state.claimSubmissionData)
  const claimSubmissionModal = useStore((state) => state.claimSubmissionModal)
  const { setClaimSubmissionModal } = useStore((state) => ({
    setClaimSubmissionModal: state.setClaimSubmissionModal,
  }))

  const PopupTitle = () => {
    let modalTitle = ''
    if (
      claimSubmissionData.claimsWithErrorMessages &&
      Object.keys(claimSubmissionData.claimsWithErrorMessages).length > 0
    ) {
      modalTitle =
        claimSubmissionData.cleanClaimIds.length > 0
          ? 'Some claims not are submitted'
          : 'Claims not submitted'
    } else {
      modalTitle = 'Claims submitted successfully'
    }

    return modalTitle
  }

  return (
    <Dialog.Root
      open={claimSubmissionModal}
      onOpenChange={setClaimSubmissionModal}
    >
      <Dialog.Content className="max-w-[600px] rounded-[0px]">
        <Dialog.Title>
          <Flex className="flex w-full items-center justify-between space-x-2">
            <Box className="flex items-center space-x-2">
              <ClaimReportSvg />
              <PopupTitle />
            </Box>
            <Box>
              <Button
                className="cursor-pointer bg-transparent text-[#000]"
                onClick={() => setClaimSubmissionModal(false)}
              >
                X
              </Button>
            </Box>
          </Flex>
        </Dialog.Title>
        <ClaimSubmissionPopupBody
          successClaims={claimSubmissionData.cleanClaimIds}
          errorClaims={claimSubmissionData.claimsWithErrorMessages}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ClaimSubmissionPopupDialog }
