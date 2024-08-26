'use client'

import { useMemo } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Flex, TextField } from '@radix-ui/themes'
import { Column, type ColumnDef, type Table } from '@tanstack/react-table'
import { ActiveCode, ActiveCodeSet } from '@psychplus/codeset'
import { cn } from '@psychplus/ui/cn'
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { useNewCode } from '../hooks'
import { useStore } from '../store'
import { ColumnProps } from '../types'
import { ActiveCodesetsTableRowActions } from './active-codesets-row-actions'

const ActiveCodesetsTable = () => {
  const {
    codeSet,
    setCodeErrors,
    newCode,
    codeErrors: errors,
    editableCode,
    setNewCode,
  } = useStore((state) => ({
    codeSet: state.codeSet,
    setCodeErrors: state.setCodeErrors,
    newCode: state.newCode,
    codeErrors: state.codeErrors,
    editableCode: state.editableCode,
    setNewCode: state.setNewCode,
  }))

  const { handleFieldChange } = useNewCode()

  const columns = useMemo(() => {
    return createColumns({
      handleFieldChange,
      newCode,
      editableCode,
      errors,
      setNewCode,
      setCodeErrors,
    })
  }, [errors])

  const memoizedData = useMemo(() => {
    const codes = codeSet?.codes || []
    return newCode !== null ? [newCode, ...codes] : codes
  }, [newCode, codeSet?.codes])

  return (
    <DataTable
      data={memoizedData}
      columns={columns}
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

const DataTableHeader = ({
  title,
  column,
}: {
  title: string
  column: Column<Partial<ActiveCodeSet>>
}) => (
  <DataTableColumnHeader
    column={column}
    title={title}
    className="text-3 font-regular text-[#000]"
  />
)

const createColumns = ({
  handleFieldChange,
  newCode,
  editableCode,
  errors,
  setNewCode,
  setCodeErrors,
}: ColumnProps): ColumnDef<Partial<ActiveCode>>[] => {
  const getCodeCellContent = (row: any) => {
    if (row.original?.id) {
      if (editableCode?.id === row.original.id) {
        return (
          <TextField.Root
            defaultValue={editableCode?.code ?? row.original.code}
            className={cn(
              errors['code'] && 'border border-solid border-[#ef3a3a]',
              'w-full',
            )}
            onBlur={(e) => {
              const inputValue = (e.target as HTMLInputElement).value
              handleFieldChange('editableCode', 'code', inputValue)
            }}
          />
        )
      } else {
        return <TableCellText text={row.original.code} />
      }
    } else {
      return (
        <TextField.Root
          defaultValue={newCode?.code}
          className={cn(
            errors['code'] && 'border border-solid border-[#ef3a3a]',
            'w-full',
          )}
          onBlur={(e) => {
            const inputValue = (e.target as HTMLInputElement).value
            handleFieldChange('newCode', 'code', inputValue)
          }}
        />
      )
    }
  }

  const getDescriptionCellContent = (row: any) => {
    if (row.original?.id) {
      if (editableCode?.id === row.original.id) {
        return (
          <TextField.Root
            defaultValue={editableCode?.displayName ?? row.original.displayName}
            className={cn(
              errors['displayName'] && 'border border-solid border-[#ef3a3a]',
              'w-full',
            )}
            onBlur={(e) => {
              const inputValue = (e.target as HTMLInputElement).value
              handleFieldChange('editableCode', 'displayName', inputValue)
            }}
          />
        )
      } else {
        return <TableCellText text={row.original.displayName} />
      }
    } else {
      return (
        <TextField.Root
          defaultValue={newCode?.displayName}
          className={cn(
            errors['displayName'] && 'border border-solid border-[#ef3a3a]',
            'w-full',
          )}
          onBlur={(e) => {
            const inputValue = (e.target as HTMLInputElement).value
            handleFieldChange('newCode', 'displayName', inputValue)
          }}
        />
      )
    }
  }

  return [
    {
      id: 'code',
      header: ({ column }) => <DataTableHeader title="Code" column={column} />,
      cell: ({ row }) => getCodeCellContent(row),
    },

    {
      id: 'description',
      header: ({ column }) => (
        <DataTableHeader title="Description" column={column} />
      ),
      cell: ({ row }) => getDescriptionCellContent(row),
    },

    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableHeader title="Actions" column={column} />
      ),
      cell: ({ row }) =>
        row.original?.id ? (
          <Flex
            className="h-3 w-9 rounded-1 bg-[#EBF3FC]"
            align="center"
            justify="center"
          >
            <ActiveCodesetsTableRowActions data={row.original} />
          </Flex>
        ) : (
          <Flex
            className="h-3 w-9 rounded-1 bg-[#EBF3FC]"
            align="center"
            justify="center"
          >
            <Cross2Icon
              height={16}
              width={16}
              color="red"
              onClick={() => {
                setNewCode(null)
                setCodeErrors({})
              }}
            />
          </Flex>
        ),
    },
  ]
}

const DataTableFooter = (table: Table<Partial<ActiveCodeSet>>) => (
  <Flex py="1" align="center" justify="end">
    <Flex gap="3" align="center">
      <DataTablePaginationLabel table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)
export { ActiveCodesetsTable }
