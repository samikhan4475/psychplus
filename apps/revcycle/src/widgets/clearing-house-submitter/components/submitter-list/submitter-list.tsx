'use client'
import {
  deleteSubmitterRecord,
  getSubmittersData
} from '@/widgets/clearing-house-submitter/api.client'
import {
  DataTable,
  DataTableColumnHeader,
} from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { PlusIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { Column, Row, type ColumnDef, type Table } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { SubmitterAddDialog } from '../submitter-add-dialog'
import {
  SubmitterFormDropdown,
} from '../submitter-dropdown'
import { SubmitterListFilter } from '../submitter-filter'
import { SubmitterListFooter } from '../submitter-list-footer'
import { SubmitterIconAction, SubmitterItem, SubmitterListColumn } from '../types'
import { ConfirmDialog } from './confirm-dialog'
import { submitterListTableSchema } from './submitter-list-table-schema'

const SubmitterList = () => {
  const [columns, setColumns] = useState<ColumnDef<SubmitterItem>[]>([])
  const [selectedSubmitterItem, setSelectedSubmitterItem] = useState<SubmitterItem | null>(null);
  const [submitterRecords, setSubmitterRecords] = useState<SubmitterItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const fetchSubmittersData = async (data: SubmitterItem = {}) => {
    try {
      const response = await getSubmittersData(0, 0, data);
      setSubmitterRecords(response);
    } catch (error) {
      console.error('error: ', error);
    }
  }

  const refresh = () => {
    fetchSubmittersData()
  }

  const headerFunction = (column: Column<SubmitterItem, unknown>, col: SubmitterListColumn) => (
    <DataTableColumnHeader
      column={column}
      title={col.title}
      className="text-[#000] font-medium" />
  )

  const handleEditSubmitterItemAction = async (row: Row<SubmitterItem>) => {
    setSelectedSubmitterItem(row.original);
    setIsDialogOpen(true);
  }

  const handleDeleteSubmitterItemAction = (row: Row<SubmitterItem>) => {
    setSelectedSubmitterItem(row.original);
    setIsDeleteDialogOpen(true);
  }

  const deleteSubmitterItem = async () => {
    if (!selectedSubmitterItem) return;
    try {
      await deleteSubmitterRecord((selectedSubmitterItem.id));
      setIsDeleteDialogOpen(false);
      setSelectedSubmitterItem(null);
      await fetchSubmittersData();
    } catch (error) {
      console.error(error)
    } finally {
      fetchSubmittersData();
    }
  }

  const cellFunction = (row: Row<SubmitterItem>, col: SubmitterListColumn) => {
    if (col.type === 'dropdown' && col.dropdownValues) {
      return (
        <SubmitterFormDropdown
          options={col.dropdownValues}
          onChange={(action: SubmitterIconAction) => {
            if (action === SubmitterIconAction.edit) {
              handleEditSubmitterItemAction(row);
            } else if (action === SubmitterIconAction.delete) {
              handleDeleteSubmitterItemAction(row);
            }
          }}
        />
      )
    }
    return <TableCellText text={`${(row.original)[col.rowName as keyof SubmitterItem]}`} />
  }


  const footerFunction = (table: Table<SubmitterItem>) => (
    <SubmitterListFooter table={table} />
  )

  useEffect(() => {
    const tempColumns: ColumnDef<SubmitterItem>[] = [];
    submitterListTableSchema?.columns?.map((col) => {
      tempColumns.push({
        ...col,
        header: ({ column }) => headerFunction(column, col),
        cell: ({ row }) => cellFunction(row, col),
        enableHiding: true,
        accessorKey: col.id,
      })
    })

    setColumns(tempColumns)
    // eslint-disable-next-line no-useless-escape
    fetchSubmittersData();
  }, []);

  return (
    <Box m="1">
      <Flex
        align="center"
        justify="between"
        className='border-b border-[#f3f2f2] py-1'
      >
        <Text size='3' weight="bold">
          Submitter
        </Text>
        <Box className='text-right'>
          <Button
            color="gray"
            variant="solid"
            className='bg-[#151B4A]'
            highContrast
            onClick={() => setIsDialogOpen(true)}
          >
            <PlusIcon />&nbsp;<Text>Add Submitter</Text>
          </Button>
        </Box>
      </Flex>
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onConfirm={() => {
          deleteSubmitterItem();
        }}
        onCancel={() => {
          setSelectedSubmitterItem(null);
          setIsDeleteDialogOpen(false)
        }}
      />
      <SubmitterAddDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedSubmitterItem={selectedSubmitterItem}
        refresh={refresh}
      />
      <SubmitterListFilter search={(data) => fetchSubmittersData(data)} />
      <DataTable
        data={submitterRecords}
        columns={columns}
        renderFooter={footerFunction}
        initialPageSize={10}
        tableClass="border border-solid border-[lightgray] "
        tHeadClass="bg-[#EBF3FC]"
        thClass="border-b border-r border-solid border-[#C1E2FF] text-left"
        isRowPan={true}
        toBodyClass="border-[lightgray]; border-b border-solid"
        columnCellClass="border border-solid border-[#F2F2F2] w-50"
      />
    </Box>
  )
}

export { SubmitterList }
