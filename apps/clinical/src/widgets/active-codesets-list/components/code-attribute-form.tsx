'use client'

import { useMemo } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Flex, TextField } from '@radix-ui/themes'
import { Column, type ColumnDef } from '@tanstack/react-table'
import { ActiveCodeAttribute } from '@psychplus/codeset'
import { cn } from '@psychplus/ui/cn'
import { DataTable, DataTableColumnHeader } from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { useNewAttribute } from '../hooks'
import { useStore } from '../store'
import { AttributeColumnProps } from '../types'
import { ActiveCodesetAttributesTableRowActions } from './active-codesets-attributes-row-actions'

interface ActiveCodeAttributesTableProps {
  codeId: string
}

const ActiveCodeAttributesTable = ({
  codeId,
}: ActiveCodeAttributesTableProps) => {
  const {
    newAttribute,
    setAttributeErrors,
    attributeErrors: errors,
    editableAttribute,
    setNewAttribute,
    attributes,
  } = useStore((state) => ({
    newAttribute: state.newAttribute,
    setAttributeErrors: state.setAttributeErrors,
    attributeErrors: state.attributeErrors,
    editableAttribute: state.editableAttribute,
    setNewAttribute: state.setNewAttribute,
    attributes: state.attributes,
  }))
  const { handleFieldChange } = useNewAttribute()

  const memoizedData = useMemo(() => {
    const attributesData = attributes || []
    return newAttribute !== null
      ? [newAttribute, ...attributesData]
      : attributesData
  }, [newAttribute, attributes])

  const columns = useMemo(() => {
    return createColumns({
      handleFieldChange,
      newAttribute,
      editableAttribute,
      errors,
      setNewAttribute,
      setAttributeErrors,
      codeId,
    })
  }, [errors])

  return (
    <DataTable
      data={memoizedData}
      columns={columns}
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
  column: Column<any>
}) => (
  <DataTableColumnHeader
    column={column}
    title={title}
    className="text-3 font-regular text-[#000]"
  />
)

const createColumns = ({
  handleFieldChange,
  newAttribute,
  editableAttribute,
  errors,
  setNewAttribute,
  setAttributeErrors,
  codeId,
}: AttributeColumnProps): ColumnDef<Partial<ActiveCodeAttribute>>[] => {
  const getNameCellContent = (row: any) => {
    if (row.original?.id) {
      if (editableAttribute?.id === row.original.id) {
        return (
          <TextField.Root className="w-full">
            <TextField.Input
              defaultValue={editableAttribute?.name ?? row.original.name}
              className={cn(
                errors['name'] && 'border border-solid border-[#ef3a3a]',
              )}
              onChange={(e) => {
                const inputValue = (e.target as HTMLInputElement).value
                handleFieldChange('editableAttribute', 'name', inputValue)
              }}
            />
          </TextField.Root>
        )
      } else {
        return <TableCellText text={row.original.name} />
      }
    } else {
      return (
        <TextField.Root className="w-full">
          <TextField.Input
            defaultValue={newAttribute?.name}
            className={cn(
              errors['name'] && 'border border-solid border-[#ef3a3a]',
            )}
            onChange={(e) => {
              const inputValue = (e.target as HTMLInputElement).value
              handleFieldChange('newAttribute', 'name', inputValue)
            }}
          />
        </TextField.Root>
      )
    }
  }

  const getContentCellContent = (row: any) => {
    if (row.original?.id) {
      if (editableAttribute?.id === row.original.id) {
        return (
          <TextField.Root className="w-full">
            <TextField.Input
              defaultValue={editableAttribute?.content ?? row.original.content}
              className={cn(
                errors['content'] && 'border border-solid border-[#ef3a3a]',
              )}
              onChange={(e) => {
                const inputValue = (e.target as HTMLInputElement).value
                handleFieldChange('editableAttribute', 'content', inputValue)
              }}
            />
          </TextField.Root>
        )
      } else {
        return <TableCellText text={row.original.content} />
      }
    } else {
      return (
        <TextField.Root className="w-full">
          <TextField.Input
            defaultValue={newAttribute?.content}
            className={cn(
              errors['content'] && 'border border-solid border-[#ef3a3a]',
            )}
            onChange={(e) => {
              const inputValue = (e.target as HTMLInputElement).value
              handleFieldChange('newAttribute', 'content', inputValue)
            }}
          />
        </TextField.Root>
      )
    }
  }

  return [
    {
      id: 'code',
      header: ({ column }) => <DataTableHeader title="Code" column={column} />,
      cell: ({ row }) => getNameCellContent(row),
    },

    {
      id: 'description',
      header: ({ column }) => (
        <DataTableHeader title="Description" column={column} />
      ),
      cell: ({ row }) => getContentCellContent(row),
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
            <ActiveCodesetAttributesTableRowActions
              data={row.original}
              codeId={codeId}
            />
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
                setNewAttribute(null)
                setAttributeErrors({})
              }}
            />
          </Flex>
        ),
    },
  ]
}

export { ActiveCodeAttributesTable }
