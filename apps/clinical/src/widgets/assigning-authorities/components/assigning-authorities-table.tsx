'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { Row, type ColumnDef, type Table } from '@tanstack/react-table'
import { UseFormReturn, useFormState, type Path } from 'react-hook-form'
import { AssigningAuthorities } from '@psychplus/codeset'
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { SchemaType } from '../assigning-authorities-widget.client'
import { useStore } from '../store'

const AssigningAuthoritiesTable = ({
  form,
}: {
  form: UseFormReturn<SchemaType>
}) => {
  const { assigningAuthorities, newAssigningAuthority } = useStore((state) => ({
    assigningAuthorities: state.assigningAuthorities,
    newAssigningAuthority: state.newAssigningAuthority,
  }))

  return (
    <DataTable
      data={
        newAssigningAuthority !== null
          ? [newAssigningAuthority, ...assigningAuthorities]
          : assigningAuthorities
      }
      columns={columns(form)}
      renderFooter={DataTableFooter}
      initialPageSize={25}
      tableClass="bg-[white]"
      tHeadClass="bg-[#EBF3FC] h-7"
      thClass="border border-solid border-[#CAD8FD] text-center"
      isRowPan={true}
      columnCellClass="border-x border-[#CAD8FD] w-50"
    />
  )
}

const columns = (
  form: UseFormReturn<SchemaType>,
): ColumnDef<Partial<AssigningAuthorities>>[] => [
  {
    id: 'assigningAuthorities',
    accessorKey: 'displayName',
    header: ({ column }) => (
      <DataTableColumnHeader title="Assigning Authorities" column={column} />
    ),
    cell: ({ row }) => RenderCell(row, 'displayName', form),
  },
  {
    id: 'namespace',
    accessorKey: 'namespace',
    header: ({ column }) => (
      <DataTableColumnHeader title="Namespace" column={column} />
    ),
    cell: ({ row }) => RenderCell(row, 'namespace', form),
  },
  {
    id: 'oid',
    accessorKey: 'oid',
    header: ({ column }) => (
      <DataTableColumnHeader title="OID" column={column} />
    ),
    cell: ({ row }) => RenderCell(row, 'oid', form),
  },
  {
    id: 'viewPermission',
    header: ({ column }) => (
      <DataTableColumnHeader title="View Permission" column={column} />
    ),
    cell: ({ row }) => RenderCell(row, 'viewPermissionCode', form),
  },
  {
    id: 'editPermission',
    header: ({ column }) => (
      <DataTableColumnHeader title="Edit Permission" column={column} />
    ),
    cell: ({ row }) => RenderCell(row, 'editPermissionCode', form),
  },
]

const RenderCell = (
  row: Row<Partial<AssigningAuthorities>>,
  property: Path<SchemaType>,
  form: UseFormReturn<SchemaType>,
) => {
  const { errors } = useFormState({
    control: form?.control,
  })

  const fieldError = errors[property]
  return row.original.id ? (
    <TableCellText text={row.original[property] as string} />
  ) : (
    <TextField.Input
      {...form.register(property)}
      className={fieldError ? 'border border-solid border-[#ef3a3a]' : ''}
    />
  )
}

const DataTableFooter = (table: Table<any>) => (
  <Flex py="1" align="center" justify="end">
    <Flex gap="3" align="center">
      <DataTablePaginationLabel table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

export { AssigningAuthoritiesTable }
