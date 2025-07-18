import { useState } from 'react'
import { Box, Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { TriangleAlert } from 'lucide-react'
import toast from 'react-hot-toast'
import { CloseDialogTrigger } from '@/components'
import { PatientProfile } from '@/types'
import { cn } from '@/utils'
import { toggleAutoReScheduling } from './actions'

interface AutomaticRebookingDialogProps {
  open: boolean
  patientProfile: PatientProfile
  patientId: string
  handleClose: (toggleStatus?: boolean) => void
}

const AutomaticRebookingDialog = ({
  open,
  patientProfile,
  patientId,
  handleClose,
}: AutomaticRebookingDialogProps) => {
  const [isConfirming, setIsConfirming] = useState(false)
  const autoSchedulingEnabled = !!patientProfile.isAutoReschedulingEnabled

  const handleConfirm = async () => {
    if (isConfirming) return
    setIsConfirming(true)
    const response = await toggleAutoReScheduling(
      patientId,
      !autoSchedulingEnabled,
    )
    setIsConfirming(false)
    if (response.state === 'error') {
      toast.error(response.error)
      return
    }
    toast.success(
      `Auto Rebooking has been ${
        autoSchedulingEnabled ? 'disabled' : 'activated'
      } successfully.`,
    )
    handleClose(true)
  }

  return (
    <Dialog.Root open={open} onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Content className="bg-pp-warning-bg-1 border-pp-warning-border rounded-2 border-2">
        <Flex justify="between" align="baseline">
          <Flex gap="3" align="center">
            <TriangleAlert className="text-pp-warning-border" />
            <Text size="5" className="font-[500]">
              Auto-Rebooking {autoSchedulingEnabled ? 'Disabled' : 'Activated'}
            </Text>
          </Flex>
          <CloseDialogTrigger />
        </Flex>
        <Box mt="3" px="5">
          <Text size="2">
            {getDescriptionText(
              autoSchedulingEnabled,
              `${patientProfile.legalName.firstName} ${patientProfile.legalName.lastName}`,
            )}
          </Text>
          <Flex gap="4" mt="3">
            <Dialog.Close>
              <Button
                variant="outline"
                color="gray"
                size="2"
                className="text-black bg-white flex-1 text-2"
              >
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              color="blue"
              className={cn(
                `bg-pp-blue-400 flex-1 ${isConfirming && 'cursor-not-allowed'}`,
              )}
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </Flex>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AutomaticRebookingDialog }

const getDescriptionText = (
  autoSchedulingEnabled: boolean,
  patientName?: string,
) =>
  autoSchedulingEnabled
    ? `You are about to disable auto-rebooking for ${patientName}. Are you sure you want to proceed?`
    : `You are about to enable auto-rebooking for ${patientName}. Are you sure you want to proceed?`
