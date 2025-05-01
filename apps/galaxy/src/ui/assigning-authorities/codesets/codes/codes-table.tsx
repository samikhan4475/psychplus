'use client'

import { useMemo } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  LongTextCell,
  TextCell,
} from '@/components'
import {
  ActionsCell,
  EditableCell,
} from '@/ui/assigning-authorities/codesets/codes/cells'
import { useStore } from '@/ui/assigning-authorities/store'
import { Code } from '@/ui/assigning-authorities/types'
import { SchemaType } from './code-schema'

const CodesTable = () => {
  const { selectedCodeset, selectedCodesetCodes, loading } = useStore()

  const form = useFormContext<SchemaType>()
  const newCodesetCode = form.watch('newCodesetCode')
  const editableCodesetCode = form.watch('editableCodesetCode')

  const memoizedData = useMemo(() => {
    const codes = selectedCodesetCodes || []
    return newCodesetCode !== undefined ? [newCodesetCode, ...codes] : codes
  }, [newCodesetCode, selectedCodesetCodes])

  const columns = useMemo(
    () => createColumns(editableCodesetCode),
    [editableCodesetCode?.id, newCodesetCode?.id, form.formState.errors],
  )

  if (loading) {
    return <LoadingPlaceholder className="bg-white min-h-40 h-full" />
  }

  if (!selectedCodeset) return null
  return (
    <ScrollArea scrollbars="both" className="bg-white h-full pr-3">
      <DataTable
        data={memoizedData}
        columns={columns}
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
        tableRowClass="relative"
        theadClass="z-[1]"
        disablePagination
        isRowSpan
        sticky
      />
    </ScrollArea>
  )
}

const createColumns = (
  editableCodesetCode: Code | undefined,
): ColumnDef<Code>[] => [
  {
    accessorKey: 'code',
    size: 300,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Code" />
    ),
    cell: ({ row }) =>
      row.original.id ? (
        <TextCell>{row.original?.code ?? ''}</TextCell>
      ) : (
        <EditableCell field="newCodesetCode.code" />
      ),
  },
  {
    accessorKey: 'displayName',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Display Name" />
    ),
    size: 510,
    cell: ({ row }) => {
      if (!row.original.id)
        return <EditableCell field="newCodesetCode.displayName" />

      return row.original.id === editableCodesetCode?.id ? (
        <EditableCell
          defaultValue={editableCodesetCode?.displayName}
          field="editableCodesetCode.displayName"
        />
      ) : (
        <LongTextCell>{row.original?.displayName ?? ''}</LongTextCell>
      )
    },
  },
  {
    id: 'actions',
    size: 70,
    header: () => <ColumnHeader label="Actions" className="!font-medium" />,
    cell: ({ row }) => ActionsCell({ row }),
  },
]

export { CodesTable }
