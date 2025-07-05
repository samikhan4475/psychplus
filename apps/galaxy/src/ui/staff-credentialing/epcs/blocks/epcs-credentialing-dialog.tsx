import { Dialog, Flex, Text } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components'

interface CredentialingDialogProps {
  open: boolean
  title: string
  staffName?: string
  iframeSrc: string
  onClose: () => void
  onLoad?: () => void
}

export const CredentialingDialog = ({
  open,
  title,
  staffName,
  iframeSrc,
  onClose,
  onLoad,
}: CredentialingDialogProps) => (
  <Dialog.Root open={open}>
    <Dialog.Content className="h-[800px] max-w-[1200px] overflow-hidden pb-16">
      <Flex justify="between" className="mb-4">
        <Text size="5" weight="medium">
          {title} {staffName}
        </Text>
        <CloseDialogTrigger onClick={onClose} />
      </Flex>
      <iframe
        src={iframeSrc}
        title={title}
        width="100%"
        height="100%"
        style={{
          border: 'none',
          display: iframeSrc ? 'block' : 'none',
        }}
        onLoad={onLoad}
      />
    </Dialog.Content>
  </Dialog.Root>
)