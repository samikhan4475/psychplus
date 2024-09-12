import { Box, Flex, Text } from '@radix-ui/themes'
import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { useStore } from '../../store'
import { ClaimSubmissionHistoryPopupBody } from './claim-submission-history-popup-body'

const ClaimSubmissionHistoryPopupDialog = () => {
  const claimSubmissionHistoryBatchId = useStore(
    (state) => state.claimSubmissionHistoryBatchId,
  )
  const claimSubmissionHistoryModalOpen = useStore(
    (state) => state.claimSubmissionHistoryModalOpen,
  )
  const { setClaimSubmissionHistoryModalOpen } = useStore((state) => ({
    setClaimSubmissionHistoryModalOpen:
      state.setClaimSubmissionHistoryModalOpen,
  }))

  return (
    <Dialog.Root
      open={claimSubmissionHistoryModalOpen}
      onOpenChange={setClaimSubmissionHistoryModalOpen}
    >
      <Dialog.Content className="max-w-[600px] rounded-[0px]">
        <Dialog.Title>
          <Flex className="flex w-full items-center justify-between space-x-2">
            <Box className="flex items-center space-x-2">
              <Text>Submission Detail</Text>
            </Box>
            <Box>
              <Button
                className="cursor-pointer bg-transparent text-[#000]"
                onClick={() => setClaimSubmissionHistoryModalOpen(false)}
              >
                X
              </Button>
            </Box>
          </Flex>
        </Dialog.Title>
        <ClaimSubmissionHistoryPopupBody
          batchId={claimSubmissionHistoryBatchId}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ClaimSubmissionHistoryPopupDialog }
