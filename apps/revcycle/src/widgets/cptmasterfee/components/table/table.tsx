'use client'

import { useEffect, useState } from 'react'
import { Box, Button } from '@radix-ui/themes'
import { Column, Row, type ColumnDef, type Table } from '@tanstack/react-table'
import { DataTable, DataTableColumnHeader } from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { MultiSelectDropdown } from '@/widgets/submitter/components/dropdown'
import { deleteCPTRecords, getCPTSearchedRecords } from '../../api.client'
import { AddDialog } from '../dialog'
import { Filter } from '../filter'
import { DataTableFooter } from '../footer'
import { ConfirmationDialog } from './confirm'

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

const cptData: CPTData = {
  tablePageSize: 25,
  manualPagination: true,
  columns: [
    {
      id: 'cpt',
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
      id: 'mcd',
      title: 'MCD',
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
      id: 'service',
      title: 'Type of Service',
      rowName: 'requirement',
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
  ],
}

interface CPT {
  macLocality?: string
  hcpcsCodes?: string[]
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

const WidgetTable = () => {
  const [columns, setColumns] = useState<ColumnDef<CPT>[]>([])
  const [optionalData, setOptionalData] = useState<CPT>({})
  const [pageRecords, setPageRecords] = useState<CPTRecord[]>([])
  const [open, setOpen] = useState(false)
  const [recordId, setRecordId] = useState<string>()
  const [confirm, setConfirm] = useState<boolean>(false)
  const renderFooter = (table: Table<CPT>) => <DataTableFooter table={table} />

  const headerFunction = (column: Column<CPT, unknown>, col: ColumnRecord) => (
    <DataTableColumnHeader column={column} title={col.title} />
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
    return (
      <TableCellText text={`${row.original[col.rowName as keyof unknown]}`} />
    )
  }

  const getRecords = () => {
    getCPTSearchedRecords()
      .then((response) => response.json())
      .then((response: CPTRecord[]) => {
        setPageRecords(response)
      })
  }

  const deleteRecord = (allowed: boolean) => {
    if (recordId && allowed) {
      deleteCPTRecords(recordId).finally(() => {
        getRecords()
      })
    }
    setConfirm(false)
  }

  const onSearch = (searchItems: CPT) => {
    const body: CPT = { ...searchItems }
    if (!body.macLocality?.trim()?.length) {
      delete body.macLocality
    }
    if (!body.cptCode?.trim()?.length) {
      delete body.cptCode
    }
    if (!body.placeOfService?.trim()?.length) {
      delete body.placeOfService
    }
    if (!body.description?.trim()?.length) {
      delete body.description
    }
    if (!body.category?.trim()?.length) {
      delete body.category
    }
    if (!body.requirement?.trim()?.length) {
      delete body.requirement
    }
    if (!body.gender?.trim()?.length) {
      delete body.gender
    }
    if (!body.minimumAge?.trim()?.length) {
      delete body.minimumAge
    }
    if (!body.maximumAge?.trim()?.length) {
      delete body.maximumAge
    }
    if (!body.resourceStatusList?.trim().length) {
      delete body.resourceStatusList
    }

    getCPTSearchedRecords(0, 0, body)
      .then((response) => response.json())
      .then((response: CPTRecord[]) => {
        setPageRecords(response)
      })
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
    cptData.columns.forEach((col) => {
      tempColumns.push({
        ...col,
        header: ({ column }) => headerFunction(column, col),
        cell: ({ row }) => cellFunction(row, col),
      })
    })
    setColumns(tempColumns)
    getRecords()
  }, [])

  return (
    <Box m="7">
      <Box className="text-right">
        <Button color="gray" variant="solid" highContrast onClick={onAdd}>
          Add
        </Button>
      </Box>
      <ConfirmationDialog
        setConfirm={setConfirm}
        confirm={confirm}
        setDeleteState={deleteRecord}
      />
      <AddDialog
        open={open}
        optionalData={optionalData}
        setDialogOpen={setDialogState}
        refresh={getRecords}
      />
      <Filter search={onSearch} />
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
