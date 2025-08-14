import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { CvxCodes } from '../../types'
const columns = () => {
  const columns: ColumnDef<CvxCodes>[] = [
    {
      id: 'cvx',
      accessorKey: 'cvx',
      size: 10,
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          label="Cvx Code"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original?.cvxCode}
        </TextCell>
      ),
      enableHiding: true,
    },
    {
      id: 'ndcCode',
      accessorKey: 'ndcCode',
      size: 10,
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          label="NDC 20"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row?.original?.ndcCode}</TextCell>
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
      cell: ({ row }) => (
        <TextCell>{row?.original?.mvxCode || '-'}</TextCell>
      ),
      enableHiding: true,
    }
  ]
  return columns
}

export { columns }
