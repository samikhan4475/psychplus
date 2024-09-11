import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { Box, Flex } from '@radix-ui/themes'
import { useStore } from '../../store'
import { ClaimSubmissionHistoryPopupBody } from './response-history-popup-body'

const ClaimSubmissionHistoryPopupDialog = () => {
  const responseHistoryBatchId = useStore(
    (state) => state.responseHistoryBatchId,
  )
  const responseHistoryModalOpen = useStore(
    (state) => state.responseHistoryModalOpen,
  )
  const { setResponseHistoryModalOpen } = useStore((state) => ({
    setResponseHistoryModalOpen:
      state.setResponseHistoryModalOpen,
  }))

  return (
    <Dialog.Root
      open={responseHistoryModalOpen}
      onOpenChange={setResponseHistoryModalOpen}
    >
      <Dialog.Content className="min-w-[800px] rounded-[0px]">
        <Dialog.Title>
          <Flex className="flex w-full items-center justify-between space-x-2">
            <Box className="flex items-center space-x-2">Response Detail</Box>
            <Box>
              <Button
                className="cursor-pointer bg-transparent text-[#000]"
                onClick={() => setResponseHistoryModalOpen(false)}
              >
                X
              </Button>
            </Box>
          </Flex>
        </Dialog.Title>
        <ClaimSubmissionHistoryPopupBody
          batchId={responseHistoryBatchId}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ClaimSubmissionHistoryPopupDialog }
