import React, { useEffect } from 'react'
import {
  Cross2Icon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Flex,
  RadioGroup,
  Text,
  TextField,
} from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Address, PatientTypes } from '@psychplus/lab-orders/types'
import { DataTable } from '@psychplus/ui/data-table/data-table'
import { DataTableColumnHeader } from '@psychplus/ui/data-table/data-table-column-header'
import { MergePatientsProps } from '../types'
import { RadioButton } from './radio-button'
import { RequiredField } from './required-field'
import { TableCellLongText } from './table-cell-contact'

const MergePatients = ({
  data,
  searchTerm,
  onSearchChange,
  onRowSelect,
  selectedRow,
  showCreatePatientButton = false,
}: MergePatientsProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    onSearchChange(value)
  }
  const columns: ColumnDef<PatientTypes>[] = [
    {
      id: 'SNO',
      size: 12,
      minSize: 12,
      maxSize: 12,
      header: ({ column }) => DataTableColumnHeader({ title: '', column }),
      cell: ({ row }) =>
        RadioButton({
          onValueChange: () => {
            onRowSelect(row.original)
          },
          rootValue: selectedRow?.legalName?.firstName,
          childValue: row.original.legalName.firstName,
        }),
      enableHiding: true,
    },
    {
      id: 'Name',
      accessorKey: 'Name',
      size: 12,
      minSize: 12,
      maxSize: 12,
      header: ({ column }) => DataTableColumnHeader({ title: 'Name', column }),
      cell: ({ row }) =>
        TableCellLongText({
          isLight: true,
          text: `${row.original.legalName.firstName} ${row.original.legalName.lastName}`,
        }),
      enableHiding: true,
    },
    {
      id: 'DOB',
      accessorKey: 'DOB',
      size: 12,
      minSize: 12,
      maxSize: 12,
      header: ({ column }) => DataTableColumnHeader({ title: 'DOB', column }),
      cell: ({ row }) =>
        TableCellLongText({
          text: format(new Date(row.original.birthdate), 'MM/dd/yyyy'),
          isLight: true,
        }),
      enableHiding: true,
    },
    {
      id: 'Gender',
      accessorKey: 'Gender',
      size: 12,
      minSize: 12,
      maxSize: 12,
      header: ({ column }) =>
        DataTableColumnHeader({ title: 'Gender', column }),
      cell: ({ row }) =>
        TableCellLongText({
          text: row.original.gender,
          isLight: true,
        }),
      enableHiding: true,
    },
    {
      id: 'Address',
      accessorKey: 'Address',
      size: 25,
      minSize: 25,
      maxSize: 30,
      header: ({ column }) =>
        DataTableColumnHeader({ title: 'Address', column }),
      cell: ({ row }) => {
        const address = row.original.contactDetails?.addresses
          ?.map((address: Address) => {
            return `${address.street1} ${
              address.street2 ? address.street2 + ', ' : ''
            }${address.city}, ${address.state}, ${address.postalCode}`
          })
          .join(', ')
        return TableCellLongText({
          text: address,
          isLight: true,
        })
      },
      enableHiding: true,
    },
  ]
  const title = showCreatePatientButton
    ? 'Search Unmapped Patient.'
    : 'Search Patient'
  const placeholder = showCreatePatientButton
    ? 'Type unmapped patient name'
    : 'Search patient name'
  return (
    <Box className="w-[600px] rounded-2 border-2 border-[#f2f2f4] p-3">
      <Flex justify="end" align="center" className="mb-2">
        <Cross2Icon className="cursor-pointer" width={16} height={16} />
      </Flex>
      <Flex gap="2" align="center">
        <Text size="1" weight="medium">
          {title}
          <RequiredField />
        </Text>
        <TextField.Root
          className="h-[28px] w-[188px] rounded-[4px] border  border-[#B9BBC6] p-2 text-1"
          value={searchTerm}
          placeholder={placeholder}
          onChange={handleSearchChange}
        />
        <Box className="flex cursor-pointer items-center justify-center rounded-4 bg-[#194595]">
          <MagnifyingGlassIcon
            scale="6"
            color="white"
            className=" h-[25px] w-[25px]"
          />
        </Box>
        {showCreatePatientButton && (
          <Button
            variant="outline"
            highContrast
            className="flex h-[24px] cursor-pointer items-center gap-[8px] rounded-[4px] border-2 border-[#194595] bg-[white] p-[2px_8px_2px_8px] text-1 font-medium text-[#194595]"
          >
            <PlusIcon
              scale="4"
              className="h-[16.25px] w-[16.25px] text-[#194595]"
            />
            Create Patient
          </Button>
        )}
      </Flex>
      <Box pt="3">
        <DataTable
          data={data}
          columns={columns}
          tableClass="border border-solid border-[#CAD8FD] !overflow-scroll max-h-[14rem]"
          tHeadClass="bg-[#EBF3FC] text-start"
          thClass="border-b border-r border-solid border-[#CAD8FD] text-start font-light"
          toBodyClass="border-[#CAD8FD] border-b border-solid"
          columnCellClass="border border-solid border-[#CAD8FD] font-light cursor-default"
        />
      </Box>
    </Box>
  )
}

export { MergePatients }
