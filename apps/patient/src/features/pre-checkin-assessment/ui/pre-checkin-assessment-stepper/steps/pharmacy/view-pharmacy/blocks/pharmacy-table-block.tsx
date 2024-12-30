import React from 'react'
import { cn } from '@psychplus-v2/utils'
import { Flex, Table, Text } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { Button } from 'react-aria-components'
import { EmptyFileIcon, FeatureEmpty } from '@/components-v2'

const ColumnHeader = ({ children }: { children: React.ReactNode }) => (
  <Table.ColumnHeaderCell className="h-auto overflow-clip py-2 text-[12px] font-medium">
    {children}
  </Table.ColumnHeaderCell>
)

type medicationTableProps = {
  headerClassName?: string
}

const rowData = [
  {
    id: 1,
    pharmacyName: 'Walgreens',
    address: '13325 Hargrave Rd Houston, TX 77070',
    city: 'Houston',
    state: 'Texas',
    zipCode: '75801',
    phoneNumber: '--',
    isPrimary: true,
  },
  {
    id: 2,
    pharmacyName: 'XYZ',
    address: '13325 Hargrave Rd Houston, TX 77070',
    city: 'Houston',
    state: 'Texas',
    zipCode: '75801',
    phoneNumber: '123456789',
    isPrimary: false,
  },
  {
    id: 3,
    pharmacyName: 'ABC',
    address: '13325 Hargrave Rd Houston, TX 77070',
    city: 'Albany',
    state: 'Texas',
    zipCode: '75801',
    phoneNumber: '123456789',
    isPrimary: false,
  },
]

const PharmacyTableBlock = ({ headerClassName }: medicationTableProps) => {
  return (
    <Table.Root variant="ghost" size="2" className="w-full">
      <Table.Header className={cn('bg-[#EBF3FC]', headerClassName)}>
        <Table.Row>
          <ColumnHeader>{''}</ColumnHeader>
          <ColumnHeader>Pharmacy Name</ColumnHeader>
          <ColumnHeader>Address</ColumnHeader>
          <ColumnHeader>City</ColumnHeader>
          <ColumnHeader>State</ColumnHeader>
          <ColumnHeader>Zip Code</ColumnHeader>
          <ColumnHeader>Phone Number</ColumnHeader>
          <ColumnHeader>Actions</ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rowData.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={11}>
              <FeatureEmpty
                description="No data to show yet"
                Icon={EmptyFileIcon}
              />
            </Table.Cell>
          </Table.Row>
        )}

        {rowData.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>
              {row.isPrimary ? (
                <Button className={'rounded-[20px] bg-[#194595] px-2'}>
                  <Text weight="medium" size="2" className="text-white">
                    Primary
                  </Text>
                </Button>
              ) : (
                <Button
                  className={
                    'rounded-[20px] border-[1px] border-[#194595] px-2'
                  }
                >
                  <Text weight="medium" size="2" className="text-[#194595]">
                    Make Primary
                  </Text>
                </Button>
              )}
            </Table.Cell>
            <Table.Cell>{row.pharmacyName}</Table.Cell>
            <Table.Cell>{row.address}</Table.Cell>
            <Table.Cell>{row.city}</Table.Cell>
            <Table.Cell>{row.state}</Table.Cell>
            <Table.Cell>{row.zipCode}</Table.Cell>
            <Table.Cell>{row.phoneNumber}</Table.Cell>
            <Table.Cell>
              <Flex justify={'center'} align={'center'}>
                <Trash2 color="#E5484D" size={18} />
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default PharmacyTableBlock
