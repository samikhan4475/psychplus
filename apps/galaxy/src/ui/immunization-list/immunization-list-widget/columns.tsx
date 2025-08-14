import React from 'react'
import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import format from 'date-fns/format'
import { ColumnHeader, TextCell } from '@/components'
import { ActionsCell, ImmunizationNameCell } from './cells'
import { ImmunizationDataResponse, ImmunizationTypeEnum } from './types'

const columns = () => {
  const columns: ColumnDef<ImmunizationDataResponse>[] = [
    {
      id: 'datetimeAdministered',
      accessorKey: 'datetimeAdministered',
      size: 10,
      header: ({ column }) => (
        <ColumnHeader column={column} label="Date" className="text-[#000]" />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original?.datetimeAdministered
            ? format(new Date(row.original.datetimeAdministered), 'MM/dd/yy')
            : '-'}
        </TextCell>
      ),
      enableHiding: true,
    },
    {
      id: 'immunization_name',
      accessorKey: 'immunization_name',
      size: 10,
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          label="Immunization Name"
          className="text-[#000]"
        />
      ),
      cell: ImmunizationNameCell,
      enableHiding: true,
    },
    {
      id: 'cvxCode',
      accessorKey: 'cvxCode',
      size: 10,
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          label="Immunization Code"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TextCell>{`${row.original?.cvxCode || '-'}`}</TextCell>
      ),
      enableHiding: true,
    },
    {
      id: 'entryType',
      accessorKey: 'entryType',
      size: 10,
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          label="Entry Type"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <Flex
          align="center"
          justify="center"
          className={
            (row.original.entryType === ImmunizationTypeEnum.Administered &&
              'w-24 bg-green-3  text-center') ||
            (row.original.entryType === ImmunizationTypeEnum.Historical &&
              'bg-pp-warning-bg w-24 text-center') ||
            (row.original.entryType === ImmunizationTypeEnum.Refusal &&
              'w-24 bg-red-3 text-center') ||
            ''
          }
        >
          <TextCell
            className={
              (row.original.entryType === ImmunizationTypeEnum.Administered &&
                'text-[#006B3B]') ||
              (row.original.entryType === ImmunizationTypeEnum.Historical &&
                'text-[#783200]') ||
              (row.original.entryType === ImmunizationTypeEnum.Refusal &&
                'text-[red]') ||
              ''
            }
          >
            {row.original.entryType || '-'}
          </TextCell>
        </Flex>
      ),
      enableHiding: true,
    },
    {
      id: 'mvxCode',
      accessorKey: 'mvxCode',
      size: 10,
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          label="Manufacture"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TextCell>{row?.original?.mvxCode || '-'}</TextCell>,
      enableHiding: true,
    },
    {
      id: 'administeringUserFullName',
      accessorKey: 'administeringUserFullName',
      size: 10,
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          label="Administered By"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.administeringUserFullName || '-'}</TextCell>
      ),
      enableHiding: true,
    },
    {
      id: 'actions',
      header: ({ column }) => <ColumnHeader column={column} label="Actions" />,
      enableHiding: false,
      cell: ActionsCell,
    },
  ]
  return columns
}

export { columns }
