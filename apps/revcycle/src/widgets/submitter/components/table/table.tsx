'use client'
import { useEffect, useState } from 'react'
import { Box, Button } from '@radix-ui/themes'
import { type Table, type ColumnDef, Column, Row } from '@tanstack/react-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { Filter } from '../filter'
import { DataTableFooter } from '../footer'
import submitter from './config'
import { AddDialog } from '../dialog'
import {
  DataTable,
  DataTableColumnHeader,
} from '@psychplus/ui/data-table'
import {
  MultiSelectDropdown,
} from '../dropdown'
import {
  getSubmitters,
  deleteSubmitter
} from '../../api.client';
import { ConfirmDialog } from './confirm'

interface ISubmitter {
  name: string;
  username: string;
  email: string;
  password: string;
  submitterId: string;
  contactPerson: string;
  phone: string;
  fax: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
}

interface IDropdown {
  value: string
  label: string
}
interface IColumn {
  id: string;
  title: string;
  rowName: string;
  editable: boolean
  type: string;
  enableHiding: boolean,
  dropdownValues?: IDropdown[];
  text: (text: string) => string;
}

interface IOptions {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  submitterId?: string;
  contactPerson?: string;
  phone?: string;
  fax?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zip?: string;
  id?: string;
}

const WidgetTable = () => {
  const [columns, setColumns] = useState<ColumnDef<ISubmitter>[]>([])
  const [optionalData, setOptionalData] = useState<IOptions>({})
  const [pageRecords, setPageRecords] = useState([])
  const [open, setOpen] = useState<boolean>(false)
  const [confirm, setConfirm] =
    useState<(confirm: boolean) => void | undefined>()
  const renderFooter = (table: Table<ISubmitter>) => (
    <DataTableFooter table={table} />
  )

  const getRecords = (data: IOptions = {}) => {
    getSubmitters(0, 0, data)
      .then(response => response.json())
      .then(response => {
        setPageRecords(response);
      });
  }

  const setOpenValue = () => {
    setOpen(true)
  }

  const setDialogOpen = (flag: boolean) => { setOpen(flag) }

  const refresh = () => {
    getRecords()
  }

  const headerFunction = (column: Column<ISubmitter, unknown>, col: IColumn) => (<DataTableColumnHeader column={column} title={col.title} />)
  const cellFunction = (row: Row<ISubmitter>, col: IColumn) => {
    if (col.type === 'dropdown' && col.dropdownValues) {
      return <MultiSelectDropdown
        options={col.dropdownValues}
        onChange={async (e: string) => {
          if (e === 'Edit') {
            setOptionalData(row.original)
            setOpen(true)
          }
          if (e === 'Delete') {
            const promise = new Promise<boolean>((resolve) => {
              setConfirm(() => resolve)
            })

            const confirmed = await promise
            setConfirm(undefined)

            if (confirmed) {
              deleteSubmitter((row.original as IOptions).id)
                .finally(() => {
                  getRecords()
                })
            }
          }
        }}
      />
    }
    return <TableCellText text={`${(row.original)[col.rowName as keyof unknown]}`} />
  }

  useEffect(() => {
    const tempColumns: ColumnDef<ISubmitter>[] = [];
    submitter.columns.forEach((col) => {
      tempColumns.push({
        ...col,
        header: ({ column }) => headerFunction(column, col),
        cell: ({ row }) => cellFunction(row, col)
      })
    })

    setColumns(tempColumns)
    // eslint-disable-next-line no-useless-escape
    getRecords()
  }, []);

  return (
    <Box m="7">
      <Box className='text-right'>
        <Button
          color="gray"
          variant="solid"
          highContrast
          onClick={setOpenValue}
        >
          Add
        </Button>
      </Box>
      <ConfirmDialog confirm={confirm} />
      <AddDialog open={open} optionalData={optionalData} setDialogOpen={setDialogOpen} refresh={refresh} />
      <Filter search={(data) => getRecords(data)} />
      <DataTable
        data={pageRecords}
        columns={columns}
        renderFooter={renderFooter}
        initialPageSize={10}
        tableClass="border border-solid border-[lightgray]"
        tHeadClass="bg-[#EBF3FC]"
        thClass=" text-center"
        columnCellClass="text-center"
      />
    </Box>
  )
}

export { WidgetTable }
