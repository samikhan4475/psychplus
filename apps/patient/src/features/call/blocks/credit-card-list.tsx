import { Flex, Text } from '@radix-ui/themes'
import { Badge, EmptyFileIcon } from '@/components-v2'
import { DataTable } from '@/components-v2/data-table'
import RadioIcon from '@/components-v2/radio-icon'
import { TableColumn } from '@/features/appointments/avs/types'
import { TextCell } from '@/features/appointments/avs/ui/components/text-cell'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { ChangePrimaryCardDialog } from '@/features/billing/credit-debit-cards/ui/credit-debit-cards-card/change-primary-card-dialog'
import {
  getCreditCardExpiry,
  getDefaultCreditCardName,
} from '@/features/billing/credit-debit-cards/utils'

const CreditCardList = ({ creditCards }: { creditCards: CreditCard[] }) => {
  const columns: TableColumn<CreditCard>[] = [
    {
      key: 'isPrimary',
      label: 'Primary',
      enableSorting: true,
      accessorFn: (row) => new Date(row.metadata.createdOn),
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.metadata.createdOn)
        const dateB = new Date(rowB.metadata.createdOn)
        return dateA.getTime() - dateB.getTime()
      },
      render: (row) => (
        <ChangePrimaryCardDialog
          creditCard={row}
          trigger={<RadioIcon checked={row?.isPrimary} />}
        />
      ),
    },
    {
      key: 'name',
      label: 'Name',
      accessorFn: (row) => new Date(row.metadata.createdOn),
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.metadata.createdOn)
        const dateB = new Date(rowB.metadata.createdOn)
        return dateA.getTime() - dateB.getTime()
      },
      render: (row) => {
        const showCustomName =
          row?.name.toLowerCase() !== getDefaultCreditCardName(row)
        return <TextCell>{showCustomName ? row?.name : null}</TextCell>
      },
    },
    {
      key: 'numberLastFour',
      label: 'Last 4 of the Card',
      accessorFn: (row) => new Date(row.metadata.createdOn),
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.metadata.createdOn)
        const dateB = new Date(rowB.metadata.createdOn)
        return dateA.getTime() - dateB.getTime()
      },
      render: (row) => {
        return <TextCell>{row?.numberLastFour}</TextCell>
      },
    },
    {
      key: 'exp',
      label: 'Exp',
      accessorFn: (row) => new Date(row.metadata.createdOn),
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.metadata.createdOn)
        const dateB = new Date(rowB.metadata.createdOn)
        return dateA.getTime() - dateB.getTime()
      },
      render: (row) => {
        const cardExpiry = getCreditCardExpiry(
          row.expireMonth,
          row.expireYear,
          false,
        )
        return <TextCell>{cardExpiry}</TextCell>
      },
    },
    {
      key: 'cardStatus',
      label: 'Verification Status',
      accessorFn: (row) => new Date(row.metadata.createdOn),
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.metadata.createdOn)
        const dateB = new Date(rowB.metadata.createdOn)
        return dateA.getTime() - dateB.getTime()
      },
      render: (row) => (
        <>
          {row?.isActive && row?.isPrimary && (
            <Badge label="Active" type="success" addIcon className="w-fit" />
          )}
          {!row.isActive && (
            <Badge label="Inactive" type="danger" addIcon className="w-fit" />
          )}
        </>
      ),
    },
  ]

  return (
    <Flex direction="column" gap="2" mb="4">
      <Text size="4">List of Payment Card</Text>
      <DataTable
        columns={columns}
        data={creditCards}
        emptyDescription="No Credit Card added"
        EmptyIcon={EmptyFileIcon}
        getRowKey={(row) => String(row?.id)}
        enableSorting
      />
    </Flex>
  )
}

export default CreditCardList
