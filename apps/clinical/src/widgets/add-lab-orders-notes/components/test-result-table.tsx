'use client'

import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { PlusCircledIcon, TrashIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { v4 as uuidv4 } from 'uuid'
import { AddLabTestResult } from '@psychplus/lab-orders/api.client'
import { DataTable } from '@psychplus/ui/data-table/data-table'
import { DataTableColumnHeader } from '@psychplus/ui/data-table/data-table-column-header'
import { useToast } from '@/providers'
import { useStore } from '../store'
import {
  GetWBCColumnsParams,
  newResult,
  ResultData,
  ResultsTableProps,
  TableMeta,
} from '../types'
import { FlagDropdownCell } from './flag-dropdown-cell'
import { ObservationTextCell } from './observation-text-cell'
import { ResultActionCell } from './result-action-cell'
import { ResultDropdownCell } from './result-dropdown-cell'
import { TextCell } from './text-cell'
import { UnitDropdownCell } from './unit-dropdown-cell'

const getTestResultColumns = ({
  labTest,
  handleInputChange,
  viewWpcResult,
  resultFlags,
  resultStatus,
  resultUnits,
  removeRow,
  appointmentId,
  toast,
}: GetWBCColumnsParams): ColumnDef<ResultData>[] => [
  {
    id: 'DateTime',
    accessorKey: 'DateTime',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date & Time"
        className="text-[#000]"
      />
    ),
    cell: ({ row, table }) =>
      ObservationTextCell({ row, table, viewWpcResult, handleInputChange }),
    enableHiding: true,
  },
  {
    id: 'Code',
    accessorKey: 'Code',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Code"
        className="text-[#000]"
      />
    ),
    cell: ({ row, table }) => (
      <TextCell
        id={row?.original?.id}
        value={row.original.resultCode}
        label="resultCode"
        table={table}
        viewWpcResult={viewWpcResult}
        handleInputChange={handleInputChange}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'Result Name',
    accessorKey: 'Result Name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Result Name"
        className="text-[#000]"
      />
    ),
    cell: ({ row, table }) => (
      <TextCell
        id={row?.original?.id}
        value={row.original.ResultName}
        label="ResultName"
        table={table}
        viewWpcResult={viewWpcResult}
        handleInputChange={handleInputChange}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'Result Value',
    accessorKey: 'Result Value',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Result Value"
        className="text-[#000]"
      />
    ),
    cell: ({ row, table }) => (
      <TextCell
        id={row?.original?.id}
        value={row.original.resultValue}
        label="resultValue"
        table={table}
        viewWpcResult={viewWpcResult}
        handleInputChange={handleInputChange}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'Unit',
    accessorKey: 'Unit',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Unit"
        className="text-[#000]"
      />
    ),
    cell: ({ row, table }) => (
      <UnitDropdownCell
        id={row?.original?.id}
        value={row.original.resultValueUnit}
        label="resultValueUnit"
        table={table}
        keyName="code"
        valueName="code"
        viewWpcResult={viewWpcResult}
        handleInputChange={handleInputChange}
        options={resultUnits}
        placeholder="Unit"
      />
    ),
    enableHiding: true,
  },
  {
    id: 'Range',
    accessorKey: 'Range',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Ref. Range"
        className="text-[#000]"
      />
    ),
    cell: ({ row, table }) => (
      <TextCell
        id={row?.original?.id}
        value={row.original.recomendedValue}
        label="recomendedValue"
        table={table}
        viewWpcResult={viewWpcResult}
        handleInputChange={handleInputChange}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'Flag',
    accessorKey: 'Flag',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Flag"
        className="text-[#000]"
      />
    ),
    cell: ({ row, table }) => (
      <FlagDropdownCell
        viewWpcResult={viewWpcResult}
        resultFlags={resultFlags}
        handleInputChange={handleInputChange}
        row={row}
        table={table}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'Status',
    accessorKey: 'Status',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className="text-[#000]"
      />
    ),
    cell: ({ row, table }) => (
      <ResultDropdownCell
        viewWpcResult={viewWpcResult}
        resultStatus={resultStatus}
        handleInputChange={handleInputChange}
        row={row}
        table={table}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'Note',
    accessorKey: 'Note',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Note"
        className="text-[#000]"
      />
    ),
    cell: ({ row, table }) => (
      <TextCell
        id={row?.original?.id}
        value={row.original.physicianComments}
        label="physicianComments"
        table={table}
        viewWpcResult={viewWpcResult}
        handleInputChange={handleInputChange}
      />
    ),
    enableHiding: true,
  },
  ...(!viewWpcResult
    ? [
        {
          id: 'Action',
          accessorKey: 'Action',
          header: ({ column }: any) => (
            <DataTableColumnHeader
              column={column}
              title="Delete"
              className="text-[#000]"
            />
          ),
          cell: ({ row }: any) => {
            if (row.index === 0 || viewWpcResult) return null
            return <TrashIcon onClick={() => removeRow(row.index)} />
          },
          enableHiding: true,
        },
      ]
    : [
        {
          id: 'Action',
          accessorKey: 'Action',
          header: ({ column }: any) => (
            <DataTableColumnHeader
              column={column}
              title="Action"
              className="text-[#000]"
            />
          ),
          cell: ({ table, row }: any) => (
            <ResultActionCell
              table={table}
              toast={toast}
              row={row}
              appointmentId={appointmentId}
            />
          ),
          enableHiding: true,
        },
      ]),
]

export const checkResultStatus = (check: string) => {
  let className = 'py-1 px-2 rounded-2 '
  let title = ''
  switch (check) {
    case 'N':
      className += 'text-[#006B3BE7] bg-[#02BA3C16]'
      title = 'Normal'
      break
    case 'L':
      className += 'text-[#BB0007D5] bg-[#FF050508]'
      title = 'Low'
      break
    case 'F':
      className += 'text-[#19404D] bg-[#7CE2FE]'
      title = 'Final'
      break
    case 'P':
      className += 'text-[#FFBA1A] bg-[#FFF3D0]'
      title = 'Partial'
      break
    case 'A':
      className += 'text-[#FFBA1A] bg-[#FFF3D0]'
      title = 'A'
      break
    default:
      break
  }
  return { className, title }
}
const TestResultsForTable = ({
  handlerWpcClose,
  viewWpcResult,
  labTest,
  wpcEditData,
}: ResultsTableProps) => {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const appointmentId = searchParams.get('appointmentId')
  const { toast } = useToast()
  let initialRowData: ResultData[]
  if (viewWpcResult) {
    if (wpcEditData.length) {
      initialRowData = wpcEditData
    } else {
      initialRowData = []
    }
  } else {
    initialRowData = [newResult]
  }

  const [rowData, setRowData] = useState<ResultData[]>(initialRowData)
  const [originalData, setOriginalData] = useState<ResultData[]>(initialRowData)

  const [editedRows, setEditedRows] = useState<ResultData | null>(null)

  const resultFlags = useStore((state) => state.resultFlags)
  const resultStatus = useStore((state) => state.resultStatus)
  const resultUnits = useStore((state) => state.resultUnits)

  const getPayload = () => {
    return rowData.map((row: ResultData) => {
      const rowWithOptionalId = row as { id?: string } & Omit<ResultData, 'id'>
      delete rowWithOptionalId.id
      return {
        ...row,
        TestName: row.testName || row.orderingLab?.name,
        metadata: {
          createdOn: new Date().toISOString(),
          createdByFullName: row.User,
        },
        labTestId: labTest.labTestId || '110434dd-2385-4024-980c-bf96be38349a',
        orderId: orderId,
      }
    })
  }
  const handleInputChange = (id: string, field: string, value: any) => {
    setRowData((prev) =>
      prev.map((row: any) =>
        row.id === id ? { ...row, [field]: value } : row,
      ),
    )
  }
  const removeRow = (index: number) => {
    setRowData((old) =>
      old.filter((_row: ResultData, idx: number) => idx !== index),
    )
  }

  const meta: TableMeta = {
    removeSpecificRow: (index: number) => {
      setRowData((old) =>
        old.filter((_row: ResultData, idx: number) => idx !== index),
      )
    },
    removeRow: () => {
      setRowData((old: ResultData[]) => old.slice(0, -1))
    },
    updateData: (rowIndex: number, columnId: string, value: string) => {
      setRowData((old) =>
        old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex],
              [columnId]: value,
            }
          }
          return row
        }),
      )
    },
    revertData: (rowIndex: number, revert: boolean) => {
      if (revert) {
        setRowData((old) =>
          old.map((row, index) =>
            index === rowIndex ? originalData[rowIndex] : row,
          ),
        )
      } else {
        setOriginalData((old) =>
          old.map((row, index) =>
            index === rowIndex ? rowData[rowIndex] : row,
          ),
        )
      }
    },
    editedRows,
    setEditedRows,
    rowData,
  }

  const addRow = () => {
    const setFunc = (old: ResultData[]) => [
      ...old,
      { ...newResult, id: uuidv4() },
    ]
    setRowData(setFunc)
  }

  const columns = useMemo(() => {
    return getTestResultColumns({
      labTest,
      appointmentId,
      handleInputChange,
      viewWpcResult,
      resultFlags,
      resultStatus,
      resultUnits,
      removeRow,
      toast,
    })
  }, [labTest, viewWpcResult, resultFlags, resultStatus, resultUnits])

  if (!appointmentId) {
    return <Text>Appointment ID is required</Text>
  }
  if (!orderId) {
    return <Text>OrderId ID is required</Text>
  }

  const handleSubmit = async () => {
    try {
      const payload = getPayload()
      const addResultPromises = payload.map((item) =>
        AddLabTestResult(appointmentId, orderId, item),
      )

      await Promise.all(addResultPromises)
      toast({ type: 'success', title: 'Result Added Against Lab Order' })
      if (typeof handlerWpcClose === 'function') {
        handlerWpcClose()
      }
    } catch (err) {
      if (err instanceof Error) {
        toast({ type: 'error', title: err.message })
      } else {
        toast({ type: 'error', title: (err as { message: string }).message })
      }
    }
  }
  return (
    <>
      {!viewWpcResult ? (
        <Flex justify="end" pb="2">
          <PlusCircledIcon scale="2" onClick={addRow} />
        </Flex>
      ) : null}
      <DataTable
        data={rowData}
        columns={columns}
        tableClass="border border-solid border-[lightgray]"
        tHeadClass="bg-[#EBF3FC]"
        thClass="border-b border-r border-solid border-[#C1E2FF] text-start"
        isRowPan={true}
        meta={meta}
        toBodyClass="border-[lightgray]; border-b border-solid"
        columnCellClass="border border-solid border-[#F2F2F2] w-50"
      />
      {!viewWpcResult ? (
        <Flex justify="end" mt="4">
          <Button onClick={handleSubmit} className="bg-[#151B4A] p-3" size="2">
            Save
          </Button>
        </Flex>
      ) : null}
    </>
  )
}

export default TestResultsForTable
