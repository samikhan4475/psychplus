'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextFieldInput } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { DatePicker } from '@psychplus/ui/date-picker'
import { Select } from '@psychplus/ui/select'
import { useStore } from '../../store'
import { Claim } from '../../types'
import { RowActionDropdown } from './data-table-row.action'
import { TableCellLongText } from './table-cell-long-text'

const columns: ColumnDef<Claim>[] = [
  {
    id: 'claimNumber',
    accessorKey: 'claimNumber',
    size: 10,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Claim #"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={100} text={row.original.claimNumber} />
    ),
    enableHiding: true,
  },
  {
    id: 'patientName',
    accessorKey: 'patientName',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Patient Name"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={130} text={row.original.patientName} />
    ),
    enableHiding: true,
  },
  {
    id: 'patientAccountNumber',
    accessorKey: 'patientAccountNumber',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Account Number"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={row.original.patientAccountNumber}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'dos',
    accessorKey: 'dos',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="DOS"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={100}
        text={row.original.dateOfServiceFrom.toISOString()}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'primaryInsurance',
    accessorKey: 'primaryInsurance',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Primary Ins."
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={row.original.primaryPatientInsurancePlanId.toString()}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'secondaryInsurance',
    accessorKey: 'secondaryInsurance',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Secondary Ins."
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={row.original.secondaryPatientInsurancePlanId.toString()}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'status',
    accessorKey: 'status',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={row.original.recordStatus} />
    ),
    enableHiding: true,
  },
  {
    id: 'totalCharge',
    accessorKey: 'totalCharge',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Charge"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={row.original.totalAmount.toString()}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'dueAmount',
    accessorKey: 'dueAmount',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Due Amount"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={row.original.amountDue.toString()}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'createdOn',
    accessorKey: 'createdOn',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Created On"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={row.original.metadata?.createdOn.toISOString()}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'submittedOn',
    accessorKey: 'submittedOn',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Submitted On"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={row.original.submittedDate.toISOString()}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    enableHiding: false,
    cell: () => <RowActionDropdown />,
  },
]

const DataTableFooter = (table: any) => (
  <Flex py="1" align="center" justify="end">
    <Flex gap="3" align="center">
      <DataTablePaginationLabel table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

const ClaimTable = () => {
  const claimList = useStore((state) => state.claimList)
  const [claimNumber, setClaimNumber] = useState<string>('')
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <>
      <Box className="shadow-lg">
        <Flex
          py="1"
          justify="start"
          className="border  border-[#b9b3b322] bg-[#fefdfd]"
        >
          <Text>Claims</Text>
        </Flex>
      </Box>

      <Box my="2">
        <Flex>
          <Text size="1" className="pt-2 font-bold">
            Claim #
          </Text>
          <FilterField
            label=""
            placeholder="12345636"
            value={claimNumber}
            onChange={(value) => setClaimNumber(value)}
          />
          <Text size="1" className="pt-2 font-bold">
            Patient
          </Text>
          <FilterField
            label=""
            placeholder="Robert Samntha"
            value={claimNumber}
            onChange={(value) => setClaimNumber(value)}
          />

          <Text size="1" className="pt-2 font-bold">
            Insurance
          </Text>
          <FilterField
            label=""
            placeholder="Medcare"
            value={claimNumber}
            onChange={(value) => setClaimNumber(value)}
          />

          <Text size="1" className="pt-2 font-bold">
            Location
          </Text>
          <Box mx="2">
            <Select.Root size="2" defaultValue="Willow Brook">
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Willow Brook</Select.Label>
                  <Select.Item value="Willow Brook">Willow Brook</Select.Item>
                  <Select.Item value="Willow Brook2">Willow Brook</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Box>

          <Text size="1" className="pt-2 font-bold">
            Date Type
          </Text>
          <Box mx="2">
            <Select.Root size="2" defaultValue="DOS">
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Label>DOS</Select.Label>
                  <Select.Item value="DOS">DOS</Select.Item>
                  <Select.Item value="DOS2">DOS</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Box>

          <Text size="1" className="pt-2 font-bold">
            From
          </Text>
          <Box mx="2">
            <DatePicker
              color="gray"
              buttonClassName="w-[150px] justify-between text-left font-regular"
              reverse={true}
              date={date}
              onSelect={setDate}
            />
          </Box>

          <Text size="1" className="pt-2 font-bold">
            To
          </Text>
          <Box mx="2">
            <DatePicker
              color="gray"
              buttonClassName="w-[150px] justify-between text-left font-regular"
              reverse={true}
              date={date}
              onSelect={setDate}
            />
          </Box>

          <Button
            variant="outline"
            highContrast
            className="h-25 mr-n5 bg-[#EAEEF9]"
          >
            Clear
          </Button>
          <Button className="h-25 ml-2 bg-[#151B4A]">
            <MagnifyingGlassIcon />
          </Button>
        </Flex>
      </Box>

      <DataTable
        data={claimList}
        columns={columns}
        tableClass="border border-solid border-[lightgray] "
        tHeadClass="bg-[#EBF3FC]"
        thClass="border-b border-r border-solid border-[#C1E2FF] text-left"
        isRowPan={true}
        toBodyClass="border-[lightgray]; border-b border-solid"
        columnCellClass="border border-solid border-[#F2F2F2] w-50"
        renderFooter={DataTableFooter}
      />
    </>
  )
}

const FilterField = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  value?: string
  onChange: (value: string) => void
}) => (
  <Box mx="2">
    <Flex align="center">
      <Text size="1" mr="1">
        {label}
      </Text>
      <TextFieldInput
        className="h-30"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Flex>
  </Box>
)

export { ClaimTable }
