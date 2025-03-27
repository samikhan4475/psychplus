'use client'

import {  ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  TextCell,
} from '@/components'
import { ActionsCell } from './cells/actions-cell'
import { CollapseCell } from './cells/collaps-cell'
import PatientNameCell from './cells/patient-name-cell'
import { MedicationRefill } from './types'

const columns: ColumnDef<MedicationRefill>[] = [
  {
    id: 'labOrderDate',
    accessorKey: 'labOrderDate',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Hx" />
    ),
    cell: CollapseCell,
  },
  {
    id: 'labOrderNumber',
    accessorKey: 'labOrderNumber',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Requested Date" />
    ),
    cell: ({ row }) => <TextCell>{row.original.labOrderNumber}</TextCell>,
  },
  {
    id: 'labOrderNumber',
    accessorKey: 'labOrderNumber',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Patient Name" />
    ),
    cell: ({ row }) => <PatientNameCell row={row}/>,
  },
  {
    id: 'orderingStaffName',
    accessorKey: 'orderingStaffName',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Prescribing Provider" />
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
      <ColumnHeader column={column} clientSideSort label="Pharmacy Name" />
    ),
    cell: ({ row }) => (
        <TextCell>
          {row.original?.orderingStaffName?.firstName ?? ''}{' '}
          {row.original?.orderingStaffName?.lastName ?? ''}
        </TextCell>
      ),
  },
  {
    id: 'orderingLab.name',
    accessorKey: 'orderingLab.name',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Medicine Name" />
    ),
    cell: ({ row }) => <TextCell>{row.original?.orderingLab?.name}</TextCell>,
  },
  {
    id: 'orderingLab.name',
    accessorKey: 'orderingLab.name',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Qty" />
    ),
    cell: ({ row }) => <TextCell>{row.original?.orderingLab?.name}</TextCell>,
  },
  {
    id: 'orderingLab.name',
    accessorKey: 'orderingLab.name',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Dosage" />
    ),
    cell: ({ row }) => <TextCell>{row.original?.orderingLab?.name}</TextCell>,
  },
  
  {
    id: 'results',
    size: 100,
    header: () => <ColumnHeader label="Days Supply" clientSideSort />,
    cell: ({ row }) => (
        <TextCell>
          {row.original?.orderingStaffName?.firstName ?? ''}{' '}
          {row.original?.orderingStaffName?.lastName ?? ''}
        </TextCell>
      ),
  },
  {
    id: 'results',
    size: 100,
    header: () => <ColumnHeader label="Substitution" clientSideSort />,
    cell: ({ row }) => (
        <TextCell>
          {row.original?.orderingStaffName?.firstName ?? ''}{' '}
          {row.original?.orderingStaffName?.lastName ?? ''}
        </TextCell>
      ),
  },
  {
    id: 'results',
    size: 100,
    header: () => <ColumnHeader label="Sig" clientSideSort />,
    cell: ({ row }) => (
        <TextCell>
          {row.original?.orderingStaffName?.firstName ?? ''}{' '}
          {row.original?.orderingStaffName?.lastName ?? ''}
        </TextCell>
      ),
  },
  {
    id: 'results',
    size: 100,
    header: () => <ColumnHeader label="Last Refill Date" clientSideSort />,
    cell: ({ row }) => (
        <TextCell>
          {row.original?.orderingStaffName?.firstName ?? ''}{' '}
          {row.original?.orderingStaffName?.lastName ?? ''}
        </TextCell>
      ),
  },
  {
    id: 'results',
    size: 100,
    header: () => <ColumnHeader label="Effective Date" clientSideSort />,
    cell: ({ row }) => (
        <TextCell>
          {row.original?.orderingStaffName?.firstName ?? ''}{' '}
          {row.original?.orderingStaffName?.lastName ?? ''}
        </TextCell>
      ),
  },
  {
    id: 'results',
    size: 100,
    header: () => <ColumnHeader label="Notes/Comments" clientSideSort />,
    cell: ({ row }) => (
        <TextCell>
          {row.original?.orderingStaffName?.firstName ?? ''}{' '}
          {row.original?.orderingStaffName?.lastName ?? ''}
        </TextCell>
      ),
  },
  {
    id: 'actions',
    size: 100,
    header: () => <ColumnHeader label="Actions" />,
    cell: ({ row }) => (
        <ActionsCell/>
      ),
  }
]
const dummyData: MedicationRefill[] = [
  {
    id: '1',
    labTestId: 'test123',
    orderId: 'order123',
    observationTime: '2025-03-17T12:00:00Z',
    resultCode: 'RC01',
    resultName: 'Result A',
    resultValue: '4.5',
    abnormalRangeCode: 'N',
    physicianComments: 'Normal',
    externalResultId: 'ext123',
    labComments: 'No issue',
    resultValueType: 'numeric',
    valueDescription: 'Good',
    recordStatus: 'active',
    labOrderNumber: 12345,
    labId: 'lab001',
    patientId: 1,
    appointmentId: 100,
    orderingStaffId: 10,
    billType: 'Standard',
    isFasting: false,
    isLabDraw: true,
    orderType: 'routine',
    orderSendStatus: true,
    orderSentDateTime: '2025-03-17T12:00:00Z',
    isPscHold: false,
    isTest: false,
    labOrderDate: '2025-03-17T12:00:00Z',
    labNotes: 'All good',
    recommendedValue: '4.5 - 6.0',
    resultValueUnit: 'mg/dL',
    orderingLab: {
      id: 'lab001',
      recordStatus: 'active',
      name: 'Lab A',
      locationName: 'Main Branch',
      locationId: 'loc001',
      consolidatorId: 'con001',
      labGroupId: 'grp001',
      isTest: false,
    },
    orderingStaffName: {
      firstName: 'John',
      lastName: 'Doe',
    }
  }
]

const MedicationOrderRefillTable = () => {
  return (
    <ScrollArea>
      <DataTable
        data={dummyData} 
        columns={columns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { MedicationOrderRefillTable }
