'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog, Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { PatientMedicationIframe } from './patient-medication-iframe'
import { useStore } from './store'

interface ScriptSureIframeDialogProps {
  iframeUrl: string
  title?: string
  isOpen: boolean
  isLoading?: boolean
  onOpenChange: (open: boolean) => void
}
const ScriptSureIframeDialog = ({
  iframeUrl,
  title,
  isOpen,
  isLoading,
  onOpenChange,
}: ScriptSureIframeDialogProps) => {
  const refetch = useStore((state) => state.refetch)
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        !open && refetch()
        onOpenChange(open)
      }}
    >
      <Dialog.Content className="relative max-h-[80vh] max-w-[60vw] overflow-y-scroll">
        <Flex justify="between" align="center" mb="2">
          <Dialog.Title
            size="5"
            weight="bold"
            className="text-black m-0 font-sans"
          >
            {title}
          </Dialog.Title>
          <Dialog.Close className="cursor-pointer">
            <Cross2Icon />
          </Dialog.Close>
        </Flex>
        {isLoading ? (
          <LoadingPlaceholder />
        ) : (
          <PatientMedicationIframe iframeSrc={iframeUrl} />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ScriptSureIframeDialog }
