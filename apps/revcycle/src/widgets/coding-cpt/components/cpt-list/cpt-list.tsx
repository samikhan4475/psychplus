'use client'

import { useEffect, useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { Column, Row, type ColumnDef, type Table } from '@tanstack/react-table'
import { DataTable, DataTableColumnHeader } from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { deleteCPTRecords, getCPTSearchedRecords } from '../../api.client'
import { SearchCPT } from '../../types'
import { CPTAddDialog } from '../cpt-dialog'
import { CPTFilterForm } from '../cpt-filter-form'
import { CPTListFooter } from '../cpt-list-footer'
import { CPTListDeleteConfirmation } from './cpt-list-delete-confirm'
import { MultiSelectDropdown } from './cpt-list-dropdown'

interface Dropdown {
  value: string
  label: string
}

interface ColumnRecord {
  id: string
  title: string
  rowName: string
  editable: boolean
  type: string
  enableHiding: boolean
  dropdownValues?: Dropdown[]
}

interface CPTData {
  tablePageSize: number
  manualPagination: boolean
  columns: ColumnRecord[]
}

interface CPT {
  macLocality?: string
  hcpcsCodes?: string
  cptCode?: string
  placeOfService?: string
  description?: string
  category?: string
  requirement?: string
  gender?: string
  minimumAge?: string
  maximumAge?: string
  resourceStatusList?: string
  id?: string
}

interface CPTRecord {
  id: string
  gender: string
  category: string
  minimumAge: string
  maximumAge: string
  effectiveFrom: string
  effectiveTill: string
  placeOfService: string
  recordStatus: string
  cptCode: string
  description: string
  requirement: string
  medicareAmount: string
}
const CptColumns = [
  {
    id: 'cptCode',
    title: 'CPT',
    rowName: 'cptCode',
    editable: false,
    type: 'text',
    enableHiding: false,
  },
  {
    id: 'pos',
    title: 'POS',
    rowName: 'placeOfService',
    editable: false,
    type: 'text',
    enableHiding: false,
  },
  {
    id: 'medicareAmount',
    title: 'MCD $',
    rowName: 'medicareAmount',
    editable: false,
    type: 'text',
    enableHiding: false,
  },
  {
    id: 'description',
    title: 'Description',
    rowName: 'description',
    editable: false,
    type: 'text',
    enableHiding: false,
  },
  {
    id: 'category',
    title: 'Category',
    rowName: 'category',
    editable: false,
    type: 'text',
    enableHiding: false,
  },
  {
    id: 'gender',
    title: 'Gender',
    rowName: 'gender',
    editable: false,
    type: 'text',
    enableHiding: false,
  },
  {
    id: 'minimumAge',
    title: 'Age Range',
    rowName: 'minimumAge',
    editable: false,
    type: 'text',
    enableHiding: false,
  },
  {
    id: 'status',
    title: 'Status',
    rowName: 'recordStatus',
    editable: false,
    type: 'text',
    enableHiding: false,
  },
  {
    id: 'actions',
    title: 'Actions',
    rowName: 'actions',
    editable: false,
    enableHiding: false,
    type: 'dropdown',
    dropdownValues: [
      { label: 'Edit', value: 'Edit' },
      { label: 'Delete', value: 'Delete' },
    ],
  },
]
const WidgetTable = () => {
  const [columns, setColumns] = useState<ColumnDef<CPT>[]>([])
  const [optionalData, setOptionalData] = useState<CPT>({})
  const [pageRecords, setPageRecords] = useState<CPTRecord[]>([])
  const [open, setOpen] = useState(false)
  const [recordId, setRecordId] = useState<string>()
  const [confirm, setConfirm] = useState<boolean>(false)
  const renderFooter = (table: Table<CPT>) => <CPTListFooter table={table} />

  const headerFunction = (column: Column<CPT, unknown>, col: ColumnRecord) => (
    <DataTableColumnHeader
      column={column}
      title={col.title}
      className="text-[#000]"
    />
  )
  const cellFunction = (row: Row<CPT>, col: ColumnRecord) => {
    if (col.type === 'dropdown' && col.dropdownValues) {
      return (
        <MultiSelectDropdown
          options={col.dropdownValues}
          onChange={async (e: string) => {
            if (e === 'Edit') {
              setOptionalData({
                ...row.original,
                minimumAge: row.original?.minimumAge?.toString(),
                maximumAge: row.original?.maximumAge?.toString(),
              })
              setOpen(true)
            }
            if (e === 'Delete') {
              setConfirm(true)
              setRecordId(row.original.id)
            }
          }}
        />
      )
    }
    if (col.id === 'status') {
      const bgColor =
        row.original[col.rowName as keyof unknown] === 'Active'
          ? 'bg-[#ECFAF0]'
          : 'bg-[#EDEDF1]'
      const textColor =
        row.original[col.rowName as keyof unknown] === 'Active'
          ? 'text-[#A3CDB8]'
          : 'text-[#82858C]'
      return (
        <Flex justify="between" className={bgColor}>
          <Box className={textColor}>
            {row.original[col.rowName as keyof unknown]}{' '}
          </Box>
        </Flex>
      )
    }
    if (col.id === 'minimumAge') {
      return (
        <TableCellText
          text={`${row.original[col.rowName as keyof unknown]}- ${
            row.original['maximumAge' as keyof unknown]
          }`}
        />
      )
    }
    return (
      <TableCellText text={`${row.original[col.rowName as keyof unknown]}`} />
    )
  }

  const getRecords = async () => {
    const response = await getCPTSearchedRecords()
    setPageRecords(response as CPTRecord[])
  }

  const deleteRecord = (allowed: boolean) => {
    if (recordId && allowed) {
      deleteCPTRecords(recordId).finally(() => {
        getRecords()
      })
    }
    setConfirm(false)
  }

  const onSearch = async (searchItems: SearchCPT) => {
    const body: SearchCPT = { ...searchItems }

    Object.keys(body).forEach((key) => {
      const typedKey = key as keyof SearchCPT
      const value = body[typedKey]
      if (typeof value === 'string') {
        if (value.trim() === '') {
          delete body[typedKey]
        }
      } else if (Array.isArray(value) && value.length === 0) {
        delete body[typedKey]
      } else if (!value) {
        delete body[typedKey]
      }
    })
    const response = await getCPTSearchedRecords(0, 0, body)
    setPageRecords(response as CPTRecord[])
  }

  const setDialogState = (flag: boolean) => {
    setOpen(flag)
  }

  const onAdd = () => {
    setOptionalData({})
    setOpen(true)
  }

  useEffect(() => {
    const tempColumns: ColumnDef<CPT>[] = []
    CptColumns.forEach((col) => {
      if (col.id === 'pos' || col.id === 'actions') {
        tempColumns.push({
          ...col,
          id: col.id,
          enableHiding: true,
          size: 50,
          header: ({ column }) => headerFunction(column, col),
          cell: ({ row }) => cellFunction(row, col),
        })
      } else {
        tempColumns.push({
          ...col,
          id: col.id,
          accessorKey: col.id,
          size: 50,
          enableHiding: true,
          header: ({ column }) => headerFunction(column, col),
          cell: ({ row }) => cellFunction(row, col),
        })
      }
    })
    setColumns(tempColumns)
    getRecords()
  }, [])

  return (
    <Box m="1">
      <Box className="text-right">
        <Flex
          justify="between"
          className="mb-2 border-b border-solid border-[#f7f6f6] py-1"
        >
          <Box>
            <Text size="4" className="pt-2 font-bold">
              CPT
            </Text>
          </Box>
          <Box>
            <Button className="h-25 ml-2 bg-[#151B4A]" onClick={onAdd}>
              <PlusIcon /> Add CPT
            </Button>
          </Box>
        </Flex>
      </Box>
      <CPTListDeleteConfirmation
        setConfirm={setConfirm}
        confirm={confirm}
        setDeleteState={deleteRecord}
      />
      <CPTAddDialog
        open={open}
        optionalData={optionalData}
        setDialogOpen={setDialogState}
        refresh={getRecords}
      />
      <CPTFilterForm search={onSearch} />
      <DataTable
        data={pageRecords}
        columns={columns}
        renderFooter={renderFooter}
        initialPageSize={10}
        tableClass="border border-solid border-[lightgray] "
        tHeadClass="bg-[#EBF3FC]"
        thClass="border-b border-r border-solid border-[#C1E2FF] text-center"
        isRowPan={true}
        toBodyClass="border-[lightgray]; border-b border-solid"
        columnCellClass="border border-solid border-[#F2F2F2] w-50"
      />
    </Box>
  )
}

export { WidgetTable }
