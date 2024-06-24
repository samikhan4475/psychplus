import React from 'react'
import { cn } from '@psychplus-v2/utils'
import { Badge, Flex, Table, Text } from '@radix-ui/themes'
import { EmptyFileIcon, FeatureEmpty } from '@/components-v2'
import type { ActiveMedication, PrescriptionMessageStatus } from '../../types'

interface Props {
  data: ActiveMedication[]
  headerClassName?: string
}

type BadgeColor = React.ComponentProps<typeof Badge>['color']

const badgeColors: Record<PrescriptionMessageStatus, BadgeColor> = {
  Active: 'green',
  Archived: 'yellow',
  Discontinued: 'red',
  Cancelled: 'red',
  'Awaiting Approval': 'yellow',
  'Current Medication': 'green',
}

const ActiveMedicationsTable = ({ data, headerClassName }: Props) => {
  return (
    <Table.Root variant="ghost" size="2" className="w-full">
      <Table.Header className={cn('bg-gray-2', headerClassName)}>
        <Table.Row>
          <ColumnHeader>Name</ColumnHeader>
          <ColumnHeader>Dose</ColumnHeader>
          <ColumnHeader>Form</ColumnHeader>
          <ColumnHeader>Indication</ColumnHeader>
          <ColumnHeader>Quantity</ColumnHeader>
          <ColumnHeader>Refill</ColumnHeader>
          <ColumnHeader>Start Date</ColumnHeader>
          <ColumnHeader>End Date</ColumnHeader>
          <ColumnHeader>Provider</ColumnHeader>
          <ColumnHeader>Pharmacy</ColumnHeader>
          <ColumnHeader>Status</ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={11}>
              <FeatureEmpty
                description="No Medications added yet"
                Icon={EmptyFileIcon}
              />
            </Table.Cell>
          </Table.Row>
        )}

        {data.map((row) => (
          <Table.Row key={row.id}>
            <NameCell row={row} />
            <DoseCell row={row} />
            <FormCell row={row} />
            <IndicationCell row={row} />
            <QuantityCell row={row} />
            <RefillsCell row={row} />
            <StartsCell row={row} />
            <EndsCell row={row} />
            <ProviderCell row={row} />
            <PharmacyCell row={row} />
            <StatusCell row={row} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

const ColumnHeader = ({ children }: { children: React.ReactNode }) => (
  <Table.ColumnHeaderCell className="h-auto overflow-clip py-2 text-[12px] font-medium">
    {children}
  </Table.ColumnHeaderCell>
)

const NameCell = ({ row }: { row: ActiveMedication }) => (
  <Table.RowHeaderCell>
    <Flex direction="column" className="min-w-[110px]">
      <Text weight="bold" className="line-clamp-1 text-[14px]">
        {row.name}
      </Text>
      <Text weight="bold" className="line-clamp-1 text-[14px]">
        {row.epn}
      </Text>
    </Flex>
  </Table.RowHeaderCell>
)

const DoseCell = ({ row }: { row: ActiveMedication }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start" pl="1">
      <Text weight="regular" className="text-[14px]">
        {row.dose}
      </Text>
    </Flex>
  </Table.Cell>
)

const FormCell = ({ row }: { row: ActiveMedication }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start" pl="1">
      <Text weight="regular" className="text-[14px]">
        {row.form}
      </Text>
    </Flex>
  </Table.Cell>
)

const IndicationCell = ({ row }: { row: ActiveMedication }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start" pl="1">
      <Text weight="regular" className="text-[14px]">
        {row.indication}
      </Text>
    </Flex>
  </Table.Cell>
)

const QuantityCell = ({ row }: { row: ActiveMedication }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start" pl="1">
      <Text weight="regular" className="text-[14px]">
        {row.quantity}
      </Text>
    </Flex>
  </Table.Cell>
)

const RefillsCell = ({ row }: { row: ActiveMedication }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start" pl="1">
      <Text weight="regular" className="text-[14px]">
        {row.refills}
      </Text>
    </Flex>
  </Table.Cell>
)

const StartsCell = ({ row }: { row: ActiveMedication }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start">
      <Text className="text-[14px]">{row.starts}</Text>
    </Flex>
  </Table.Cell>
)

const EndsCell = ({ row }: { row: ActiveMedication }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start">
      <Text className="text-[14px]">{row.ends}</Text>
    </Flex>
  </Table.Cell>
)

const ProviderCell = ({ row }: { row: ActiveMedication }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start" className="min-w-[85px]">
      <Text className="line-clamp-3 text-[14px]">{row.provider}</Text>
    </Flex>
  </Table.Cell>
)

const PharmacyCell = ({ row }: { row: ActiveMedication }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start">
      <Text className="line-clamp-3 text-[14px]">{row.pharmacy}</Text>
    </Flex>
  </Table.Cell>
)

const StatusCell = ({ row }: { row: ActiveMedication }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start">
      <Text className="text-[14px]">
        <Badge color={badgeColors[row.status]} radius="large">
          {row.status}
        </Badge>
      </Text>
    </Flex>
  </Table.Cell>
)

export { ActiveMedicationsTable }
