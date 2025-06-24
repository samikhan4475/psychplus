import { useState } from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { rxCancleRequestAction } from '../actions'
import { ConfirmationDialog } from '../confirmation-dialog'
import { useStore } from '../store'
import {
  MedicationRefillAPIRequest,
  PharmacyNotificationType,
  PrescriberRxRenewalResponse,
} from '../types'

interface ActionsCellProps {
  row: Row<PrescriberRxRenewalResponse>
}

const NestedActionsCell = ({ row }: ActionsCellProps) => {
  const {
    pharmacyNotificationResponseDrug,
    notificationType,
    userResponseType,
  } = row.original
  const { searchMedicationsList, activeTab } = useStore()
  const isRefillTab = activeTab.includes('Refill')
  const [isConfirmationDialog, setIsConfirmationDialog] =
    useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const onClose = (open: boolean) => setIsConfirmationDialog(open)

  const handleActionClick = () => {
    setIsConfirmationDialog(true)
  }

  const onConfirm = async () => {
    setIsLoading(true)
    const responseList = pharmacyNotificationResponseDrug?.[0]
    const result = await rxCancleRequestAction(
      responseList?.notificationId ?? '',
      responseList?.pharmacyNotificationResponseId ?? '',
    )
    if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to cancel request')
    } else if (result.state === 'success') {
      toast.success('Cancelled successfully')
    }
    setIsLoading(false)
    onClose(false)
    const formattedData: MedicationRefillAPIRequest = {
      notificationType: isRefillTab
        ? PharmacyNotificationType.PharmacyRxRenewalRequest
        : PharmacyNotificationType.PharmacyRxChangeRequest,
    }
    searchMedicationsList(formattedData)
  }

  const shouldShowButton = () => {
    if (
      notificationType === 'PrescriberRxCancelRequest' ||
      userResponseType === 'Cancelled'
    ) {
      return false
    }
    return true
  }
  if (!shouldShowButton()) return null 
  return (
    <>
      <ConfirmationDialog
        onConfirmation={onConfirm}
        heading="Confirmation"
        content={`Are you sure you want to cancel this medication?`}
        isOpen={isConfirmationDialog}
        closeDialog={onClose}
        isLoading={isLoading}
      />

      <Flex gap="1" align="center" className="w-full ">
        <Button
          className="border-pp-grey bg-white h-6 flex-row gap-1 rounded-2 border border-solid align-middle"
          type="button"
          onClick={handleActionClick}
        >
          <Text className="text-pp-black-3 text-1">Cancel</Text>
        </Button>
      </Flex>
    </>
  )
}

export { NestedActionsCell }
