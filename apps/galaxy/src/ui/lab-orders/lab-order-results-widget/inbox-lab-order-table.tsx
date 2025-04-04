'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef, Table, Row } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  DateTimeCell,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { LabOrders } from '@/types'
import { LabTestCell, StatusCell } from '../lab-orders-widget/cells'
import { useStore } from './store'
import { formatUTCDate } from '@/utils'
import { InboxOrderActionsCell } from './cells/inbox-order-actions-cell'
import { TableHeaderCheckboxCell } from './cells/table-header-checkbox-cell'
import { TableRowCheckboxCell } from './cells/table-row-checkbox-cell'
import { OrderStatus } from './types'
import {  STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { useStore as useGlobalStore } from '@/store'
const getColumns = (
  onRowCheckBoxSelect: (
    row?: Row<LabOrders>,
    table?: Table<LabOrders>,
    isChecked?: boolean,
  ) => void,
) => {
  const columns: ColumnDef<LabOrders>[] = [
    {
      id: 'select',
      header: ({ table }: { table: Table<LabOrders> }) => (
        <TableHeaderCheckboxCell
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(isChecked) => {
            table.toggleAllPageRowsSelected(isChecked)
            if (!isChecked) {
              onRowCheckBoxSelect(undefined, table, false)
            } else {
              onRowCheckBoxSelect(undefined, table, true)
            }
          }}
        />
      ),
      maxSize:30,
      cell: ({ row }: { row: Row<LabOrders> }) =>
        !row.original.isResultSigned ? (
          <TableRowCheckboxCell
            checked={row.getIsSelected()}
            onCheckedChange={(isChecked: boolean) => {
              row.toggleSelected(isChecked)
              onRowCheckBoxSelect(row, undefined, isChecked)
            }}
          />
        ) : null,
    },
    {
      id: 'labOrderDate',
      accessorKey: 'labOrderDate',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Order Date" />
      ),
      cell: ({ row }) => (
        <DateTimeCell>{formatUTCDate(row.original.labOrderDate)}</DateTimeCell>
      ),
    },
    {
      id: 'patientName',
      accessorKey: 'patientName',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Patient Name" />
      ),
      cell: ({ row }) => <TextCell className={row.original?.isResultAbnormal ? 'text-red-9' : ''} >{`${row.original.patient?.legalName?.firstName} ${row.original.patient?.legalName?.lastName} `}</TextCell>,
    },
    {
      id: 'labOrderNumber',
      accessorKey: 'labOrderNumber',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Lab Order #" />
      ),
      cell: ({ row }) => <TextCell>{row.original.labOrderNumber}</TextCell>,
    },
    {
      id: 'orderingStaffName',
      accessorKey: 'orderingStaffName',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Ordered By" />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original?.orderingStaffName?.firstName ?? ''}{' '}
          {row.original?.orderingStaffName?.lastName ?? ''}
        </TextCell>
      ),
    },
    {
      id: 'labTests',
      accessorKey: 'labTests',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Test/Panel" />
      ),
      cell: ({ row }) => <LabTestCell row={row} />,
    },
    {
      id: 'orderingLab.name',
      accessorKey: 'orderingLab.name',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Lab Location" />
      ),
      cell: ({ row }) => <TextCell>{row.original?.orderingLab?.name}</TextCell>,
    },
    {
      id: 'orderStatus',
      accessorKey: 'orderStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="Status"
          column={column}
          clientSideSort
          className="!text-black p-1 !font-medium"
        />
      ),
      cell: ({ row }) => <StatusCell row={row} />,
    },
    {
      id: 'actions',
      size: 100,
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <InboxOrderActionsCell row={row} />,
    },
  ]
  return columns
}

const InboxLabOrderTable = () => {
  const {
    data,
    fetchLabOrderResults,
    loading,
    setSelectedRow,
    selectedRows,
    setSelectedRows
  } = useStore((state) => ({
    data: state.data,
    fetchLabOrderResults: state.fetchLabOrderResults,
    loading: state.loading,
    selectedRows: state.selectedRows,
    setSelectedRow: state.setSelectedRow,
    setSelectedRows: state.setSelectedRows,
  }));

  const { staffId, staffRoleCode } = useGlobalStore((state) => ({
        staffId: state.user.staffId,
        staffRoleCode: state.staffResource.staffRoleCode,
      }))
  const isPrescriber = staffRoleCode === STAFF_ROLE_CODE_PRESCRIBER
  const { id } = useParams<{ id: string }>()

  const onRowCheckBoxSelect = (
    row?: Row<LabOrders>,
    table?: Table<LabOrders>,
    isChecked?: boolean,
  ) => {
    if (table && isChecked) {
      setSelectedRows(data?.labOrders || []);
      setSelectedRow(undefined);
      return;
    }

    if (table && !isChecked) {
      setSelectedRows([]);
      table.toggleAllPageRowsSelected(false);
      return;
    }

    if (row && isChecked) {
      setSelectedRow(undefined);
    }

    if (row) {
      const result = isChecked
        ? [...(selectedRows || []), row.original]
        : selectedRows?.filter((note) => note.id !== row.original.id) || [];
      setSelectedRows(result);
    }

    if (selectedRows.length === 0) {
      table?.toggleAllPageRowsSelected(false);
    }
  };

  useEffect(() => {
    const payload = {
      orderStatus: OrderStatus.ResultReceived,
      isIncludePatient: true,
      isResultSigned: false,
      orderingStaffId: isPrescriber ? String(staffId) : '',
    };

    fetchLabOrderResults(payload);
  }, [id]);

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center" className="mt-5">
        <LoadingPlaceholder />
      </Flex>
    )
  }
  return (
    <ScrollArea>
      <DataTable
        data={data?.labOrders ?? []}
        columns={getColumns(
          onRowCheckBoxSelect,
        )}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { InboxLabOrderTable }
