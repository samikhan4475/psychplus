import {
  cn,
  formatCurrency,
  getSlashedDateString,
  getTimeLabel,
} from '@psychplus-v2/utils'
import { Flex, Table, Text } from '@radix-ui/themes'
import { ReceiptTextIcon } from 'lucide-react'
import { FeatureEmpty } from '@/components-v2'
import { PaymentHistoryItem } from '@/features/billing/payments/types/payment-history'

interface PaymentHistoryTableProps {
  data: PaymentHistoryItem[]
  headerClassName?: string
}

const PaymentHistoryTable = ({
  data,
  headerClassName,
}: PaymentHistoryTableProps) => {
  if (data.length === 0) {
    return (
      <FeatureEmpty
        title="No Payments"
        description="No payment history found."
        Icon={ReceiptTextIcon}
      />
    )
  }

  return (
    <Table.Root variant="ghost" size="2">
      <Table.Header className={cn('bg-gray-2', headerClassName)}>
        <Table.Row>
          <ColumnHeader>Date/Time</ColumnHeader>
          <ColumnHeader>Charge</ColumnHeader>
          <ColumnHeader>Description</ColumnHeader>
          <ColumnHeader>Copay Due</ColumnHeader>
          <ColumnHeader>Copay Paid</ColumnHeader>
          <ColumnHeader>Co-ins Due</ColumnHeader>
          <ColumnHeader>Co-ins Paid</ColumnHeader>
          <ColumnHeader>Balance Due</ColumnHeader>
          <ColumnHeader>Balance Paid</ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((row) => (
          <Table.Row key={row.id}>
            <DateCell row={row} />
            <ChargeCell row={row} />
            <DescriptionCell row={row} />
            <CurrencyCell amount={row.coPayDue} />
            <CurrencyCell amount={row.coPayPaid} />
            <CurrencyCell amount={row.coInsuranceDue} />
            <CurrencyCell amount={row.coInsurancePaid} />
            <CurrencyCell amount={row.balanceDue} />
            <CurrencyCell amount={row.balancePaid} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

const ColumnHeader = ({ children }: { children: React.ReactNode }) => (
  <Table.ColumnHeaderCell className="h-auto whitespace-nowrap py-2 text-[12px] font-medium">
    {children}
  </Table.ColumnHeaderCell>
)

const DateCell = ({ row }: { row: PaymentHistoryItem }) => (
  <Table.RowHeaderCell>
    <Flex height="100%" align="center" justify="start">
      <Text size="1">
        {getSlashedDateString(row.chargeDate, true)}{' '}
        {getTimeLabel(row.chargeDate)}
      </Text>
    </Flex>
  </Table.RowHeaderCell>
)

const ChargeCell = ({ row }: { row: PaymentHistoryItem }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start">
      <Text size="1">{row.type}</Text>
    </Flex>
  </Table.Cell>
)

const DescriptionCell = ({ row }: { row: PaymentHistoryItem }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start">
      <Text size="1">{row.description}</Text>
    </Flex>
  </Table.Cell>
)

const CurrencyCell = ({ amount }: { amount: number }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="center">
      <Text size="1">{formatCurrency(amount)}</Text>
    </Flex>
  </Table.Cell>
)

export { PaymentHistoryTable }
