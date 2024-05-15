import { cn } from '@psychplus-v2/utils'
import { Flex, Table, Text } from '@radix-ui/themes'
import { PillIcon } from 'lucide-react'
import { FeatureEmpty } from '@/components-v2'
import type { PastMedication } from '../../types'

interface PastMedicationsTableProps {
  data: PastMedication[]
  headerClassName?: string
}

const PastMedicationsTable = ({
  data,
  headerClassName,
}: PastMedicationsTableProps) => {
  if (data.length === 0) {
    return (
      <FeatureEmpty
        title="No Past Medications"
        description="When your medications become inactive, you'll see them here."
        Icon={PillIcon}
      />
    )
  }

  return (
    <Table.Root variant="ghost" size="1" className="border-0">
      <Table.Header className={cn('bg-gray-2', headerClassName)}>
        <Table.Row>
          <ColumnHeader>Name</ColumnHeader>
          <ColumnHeader>Supply</ColumnHeader>
          <ColumnHeader>Refills</ColumnHeader>
          <ColumnHeader>Ends</ColumnHeader>
          <ColumnHeader>Provider</ColumnHeader>
          <ColumnHeader>Pharmacy</ColumnHeader>
          <ColumnHeader>Address</ColumnHeader>
          <ColumnHeader>Comments</ColumnHeader>
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
            <AddressCell row={row} />
            <CommentsCell row={row} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

const ColumnHeader = ({ children }: { children: React.ReactNode }) => (
  <Table.ColumnHeaderCell className="text-[12px] font-medium">
    {children}
  </Table.ColumnHeaderCell>
)

const NameCell = ({ row }: { row: PastMedication }) => (
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

const SupplyCell = ({ row }: { row: PastMedication }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start" pl="1">
      <Text weight="medium" className="text-[14px]">
        {row.supply}
      </Text>
    </Flex>
  </Table.Cell>
)

const RefillsCell = ({ row }: { row: PastMedication }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start" pl="1">
      <Text weight="medium" className="text-[14px]">
        {row.refills}
      </Text>
    </Flex>
  </Table.Cell>
)

const EndsCell = ({ row }: { row: PastMedication }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start">
      <Text className="text-[14px]">{row.ends}</Text>
    </Flex>
  </Table.Cell>
)

const ProviderCell = ({ row }: { row: PastMedication }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start" className="min-w-[85px]">
      <Text className="line-clamp-3 text-[14px]">{row.provider}</Text>
    </Flex>
  </Table.Cell>
)

const PharmacyCell = ({ row }: { row: PastMedication }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start">
      <Text className="line-clamp-3 text-[14px]">{row.pharmacy}</Text>
    </Flex>
  </Table.Cell>
)

const AddressCell = ({ row }: { row: PastMedication }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start">
      <Text className="line-clamp-3 text-[14px]">{row.address}</Text>
    </Flex>
  </Table.Cell>
)

const CommentsCell = ({ row }: { row: PastMedication }) => (
  <Table.Cell>
    <Flex height="100%" align="center" justify="start">
      {row.comments ? (
        <Text className="line-clamp-3 text-[14px] text-gray-11">
          {row.comments}
        </Text>
      ) : (
        <Text weight="light" className="text-[18px] text-gray-8">
          ----
        </Text>
      )}
    </Flex>
  </Table.Cell>
)

export { PastMedicationsTable }
