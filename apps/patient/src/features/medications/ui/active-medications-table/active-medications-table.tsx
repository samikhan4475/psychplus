import React from 'react'
import { cn } from '@psychplus-v2/utils'
import { Badge, Flex, Table, Text } from '@radix-ui/themes'
import { PillIcon } from 'lucide-react'
import { FeatureEmpty } from '@/components-v2'
import type { ActiveMedication, PrescriptionMessageStatus } from '../../types'

interface Props {
  data: ActiveMedication[]
  headerClassName?: string
}

type BadgeColor = React.ComponentProps<typeof Badge>['color']

const badgeColors: Record<PrescriptionMessageStatus, BadgeColor> = {
  Success: 'green',
  Pending: 'yellow',
  Error: 'red',
}

const ActiveMedicationsTable = ({ data, headerClassName }: Props) => {
  if (data.length === 0) {
    return (
      <FeatureEmpty
        title="No Active Medications"
        description="When you have active medications, you'll see them here."
        Icon={PillIcon}
      />
    )
  }

  return (
    <Table.Root variant="ghost" size="2">
      <Table.Header className={cn('bg-gray-2', headerClassName)}>
        <Table.Row>
          <ColumnHeader>Name</ColumnHeader>
          <ColumnHeader>Supply</ColumnHeader>
          <ColumnHeader>Refills</ColumnHeader>
          <ColumnHeader>Ends</ColumnHeader>
          <ColumnHeader>Provider</ColumnHeader>
          <ColumnHeader>Pharmacy</ColumnHeader>
          <ColumnHeader>Status</ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((row) => (
          <Table.Row key={row.id}>
            <NameCell row={row} />
            <SupplyCell row={row} />
            <RefillsCell row={row} />
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
    <Flex direction="column" className="min-w-[125px]">
      <Text weight="medium" className="line-clamp-1 text-[14px]">
        {row.name}
      </Text>
      <Text className="line-clamp-1 text-[13px] text-gray-11">{row.epn}</Text>
      <Text className="line-clamp-1 text-[13px] text-gray-11">
        {row.directions}
      </Text>
    </Flex>
  </Table.RowHeaderCell>
)

const SupplyCell = ({ row }: { row: ActiveMedication }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start" pl="1">
      <Text weight="medium" className="text-[14px]">
        {row.supply}
      </Text>
    </Flex>
  </Table.Cell>
)

const RefillsCell = ({ row }: { row: ActiveMedication }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start" pl="1">
      <Text weight="medium" className="text-[14px]">
        {row.refills}
      </Text>
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
        <Badge color={badgeColors[row.status]}>{row.status}</Badge>
      </Text>
    </Flex>
  </Table.Cell>
)

export { ActiveMedicationsTable }
