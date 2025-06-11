import { useState } from 'react'
import {
  Badge,
  BadgeProps,
  Box,
  Button,
  Flex,
  Popover,
  ScrollArea,
  Text,
} from '@radix-ui/themes'
import { ColumnDef, Row } from '@tanstack/react-table'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { ColumnHeader, DataTable, LongTextCell, TextCell } from '@/components'
import { formatDateTime } from '@/utils'
import { rxCancleRequestAction } from '../actions'
import { ConfirmationDialog } from '../confirmation-dialog'
import { DeclineMedicationDialog } from '../dialogs/decline-prescription-request-dialog'
import { UpdateMedicationDialog } from '../dialogs/update-medication-dialog'
import PatientMapDialog from '../patient-map/map-patient-dialog'
import { useStore } from '../store'
import {
  MedicationHistoryResponse,
  MedicationRefill,
  MedicationRefillAPIRequest,
  PharmacyNotificationType,
  PrescriberRxRenewalResponse,
  RenewalResponseTypeEnum,
} from '../types'

interface ActionsCellProps {
  row: Row<MedicationRefill>
}
const badgeColorMap: Record<string, BadgeProps['color']> = {
  Approved: 'green',
  Denied: 'red',
}

const columns: ColumnDef<PrescriberRxRenewalResponse>[] = [
  {
    id: 'notificationType',
    accessorKey: 'notificationType',
    header: ({ column }) => (
      <ColumnHeader label="Notification Type" column={column} clientSideSort />
    ),
    cell: ({ row }) => (
      <LongTextCell>{row.original.notificationTypeDisplayName}</LongTextCell>
    ),
  },
  {
    id: 'responseDate',
    accessorKey: 'responseDate',
    header: ({ column }) => (
      <ColumnHeader label="Response Date/Time" column={column} clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell className="w-[120px]">
        {formatDateTime(row.original.responseDate)}
      </TextCell>
    ),
  },

  {
    id: 'userResponseType',
    accessorKey: 'userResponseType',
    header: ({ column }) => (
      <ColumnHeader label="Response" column={column} clientSideSort />
    ),
    cell: ({ row }) => (
      <LongTextCell>{row.original.userResponseType}</LongTextCell>
    ),
  },
  {
    id: 'userTransactionStatus',
    accessorKey: 'userTransactionStatus',
    header: ({ column }) => (
      <ColumnHeader label="Transaction Status" column={column} clientSideSort />
    ),
    cell: ({ row }) => (
      <LongTextCell>{row.original.userTransactionStatus}</LongTextCell>
    ),
  },
]
const ActionsCell = ({ row }: ActionsCellProps) => {
  const {
    isResponsePending,
    notificationUserResponseType,
    patientId,
    pharmacyNotificationResponseList,
  } = row.original
  const { toggleSelected, getIsSelected } = row
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
    const responseList = pharmacyNotificationResponseList?.[0]
    const result = await rxCancleRequestAction(
      responseList?.notificationId ?? '',
      responseList?.id ?? '',
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
  let content: React.ReactNode
  if (!patientId) {
    content = (
      <>
        <DeclineMedicationDialog row={row} /> <PatientMapDialog row={row} />
      </>
    )
  } else if (isResponsePending) {
    content = (
      <>
        <DeclineMedicationDialog row={row} />
        <UpdateMedicationDialog row={row} />
      </>
    )
  } else {
    const getBadgeColor = (status: string): BadgeProps['color'] =>
      badgeColorMap[status] ?? 'green'

    content = (
      <Flex  align="center" justify="between">
        <Badge
          className="!rounded-none"
          color={getBadgeColor(notificationUserResponseType ?? '')}
        >
          {notificationUserResponseType}
        </Badge>
        {notificationUserResponseType === RenewalResponseTypeEnum.Approved && (
          <Button
            className="border-pp-grey bg-white h-6 flex-row gap-1 rounded-2 border border-solid align-middle"
            type="button"
            onClick={handleActionClick}
          >
            <Text className="text-pp-black-3 text-1">Cancel</Text>
          </Button>
        )}
        <Box onClick={(e) => e.stopPropagation()}>
          <Popover.Root onOpenChange={toggleSelected} modal>
            <Popover.Trigger>
              <Button
                className="text-black !outline-none"
                type="button"
                variant="ghost"
                color="gray"
                size="1"
              >
                {getIsSelected() ? (
                  <ChevronDownIcon size={16} />
                ) : (
                  <ChevronRightIcon size={16} />
                )}
              </Button>
            </Popover.Trigger>
            <Popover.Content
              className="-mb-2 -mt-2 w-screen max-w-[calc(100vw_-_900px)] rounded-1 !p-0"
              align="start"
              alignOffset={3}
            >
              <ScrollArea className="max-h-44 p-2">
                <DataTable
                  columns={columns}
                  data={pharmacyNotificationResponseList ?? []}
                  sticky
                  theadClass="z-[1]"
                  disablePagination
                />
              </ScrollArea>
            </Popover.Content>
          </Popover.Root>
        </Box>
      </Flex>
    )
  }

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
        {content}
      </Flex>
    </>
  )
}

export { ActionsCell }
