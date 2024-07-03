import { Box, Button } from '@radix-ui/themes'
import { Dialog } from '@psychplus/ui/dialog'
import { ClaimWidget } from './claim-history-widget'

const ClaimHistoryDialog = ({ claimId }: { claimId: string }) => (
  <Dialog.Root>
    <Dialog.Trigger>
      <Box className="text-right">
        <Button color="gray" variant="solid" highContrast>
          Hx
        </Button>
      </Box>
    </Dialog.Trigger>
    <Dialog.Content className="max-w-[600px]">
      <Dialog.Title>Claim History</Dialog.Title>
      <ClaimWidget claimId={claimId} />
    </Dialog.Content>
  </Dialog.Root>
)

export { ClaimHistoryDialog }
