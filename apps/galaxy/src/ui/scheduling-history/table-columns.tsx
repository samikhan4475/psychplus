'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import {
  AdmittingDateCell,
  AdmittingProviderCell,
  FacilityAdmissionCell,
  HistoryCell,
  VisitStatusCell,
  VisitTypeCell,
} from './cells'
import { SchedulingHistory } from './types'

const columns: ColumnDef<SchedulingHistory>[] = [
  {
    accessorKey: 'visitNumber',
    header: ({ column }) => (
      <ColumnHeader
        label="Visit #"
        column={column}
        className="!text-black p-1 !font-medium"
      />
    ),

    cell: ({ row }) => <TextCell>{row.original.visitNumber} </TextCell>,
  },
  {
    accessorKey: 'facilityAdmission',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Facility Admission"
        className="!text-black justify-center !font-medium"
      />
    ),
    columns: [
      {
        accessorKey: 'facilityAdmission.id',
        header: ({ column }) => (
          <ColumnHeader
            label="ID"
            className="!text-black p-1 !font-medium"
            column={column}
          />
        ),
        cell: ({ row }) => (
          <TextCell>{row.original.facilityAdmission.id}</TextCell>
        ),
      },
      {
        accessorKey: 'facilityAdmission.admittingProvider',
        header: ({ column }) => (
          <ColumnHeader
            label="Admitting Provider"
            column={column}
            className="!text-black p-1 !font-medium"
          />
        ),
        cell: ({ row }) => <AdmittingProviderCell row={row} />,
      },
      {
        accessorKey: 'facilityAdmission.admitDateTime',
        header: ({ column }) => (
          <ColumnHeader
            label="Admit date/time"
            column={column}
            className="!text-black p-1 !font-medium"
          />
        ),
        cell: ({ row }) => <AdmittingDateCell row={row} />,
      },
      {
        accessorKey: 'facilityAdmission.dischargeDate',
        header: ({ column }) => (
          <ColumnHeader
            label="Discharge date"
            column={column}
            className="!text-black p-1 !font-medium"
          />
        ),
        cell: ({ row }) => (
          <TextCell>{row.original.facilityAdmission.dischargeDate}</TextCell>
        ),
      },
      {
        id: 'hx',
        header: () => (
          <ColumnHeader label="Hx" className="!text-black p-1 !font-medium" />
        ),
        cell: ({ row }) => <FacilityAdmissionCell row={row} />,
      },
    ],
  },
  {
    accessorKey: 'dateOfService',
    header: ({ column }) => (
      <ColumnHeader
        label="Date of Service"
        column={column}
        className="!text-black p-1 !font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.dateOfService}</TextCell>,
  },
  {
    accessorKey: 'visitType',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Visit Type"
        className="!text-black p-1 !font-medium"
      />
    ),
    cell: ({ row }) => <VisitTypeCell row={row} />,
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Location"
        className="!text-black p-1 !font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.location}</TextCell>,
  },
  {
    accessorKey: 'service',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Service"
        className="!text-black p-1 !font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.service}</TextCell>,
  },
  {
    accessorKey: 'providerType',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Provider Type"
        className="!text-black p-1 !font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.providerType} </TextCell>,
  },
  {
    accessorKey: 'provider',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Provider"
        className="!text-black p-1 !font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.provider} </TextCell>,
  },
  {
    accessorKey: 'cosigner',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Cosigner"
        className="!text-black p-1 !font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.cosigner} </TextCell>,
  },
  {
    accessorKey: 'dcDate',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="DC Date"
        className="!text-black p-1 !font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.dcDate}</TextCell>,
  },
  {
    accessorKey: 'dcHospiceName',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="DC Hosp. Name"
        className="!text-black p-1 !font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.dcHospiceName} </TextCell>,
  },
  {
    accessorKey: 'visitStatus',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Visit Status"
        className="!text-black p-1 !font-medium"
      />
    ),
    cell: ({ row }) => <VisitStatusCell row={row} />,
  },
  {
    accessorKey: 'residingState',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Residing State"
        className="!text-black p-1 !font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.residingState}</TextCell>,
  },
  {
    id: 'insurance',
    header: () => (
      <ColumnHeader
        label="Insurance"
        className="!text-black w-full p-1 text-center !font-medium"
      />
    ),
    columns: [
      {
        accessorKey: 'insurance.primaryInsurance',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            label="Primary"
            className="!text-black p-1 !font-medium"
          />
        ),
        cell: ({ row }) => (
          <TextCell>{row.original.insurance.primaryInsurance}</TextCell>
        ),
      },
      {
        accessorKey: 'insurance.secondaryInsurance',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            label="Secondary"
            className="!text-black p-1 !font-medium"
          />
        ),
        cell: ({ row }) => (
          <TextCell>{row.original.insurance.secondaryInsurance}</TextCell>
        ),
      },
    ],
  },
  {
    accessorKey: 'organization',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Organization"
        className="!text-black p-1 !font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.organization}</TextCell>,
  },
  {
    accessorKey: 'practice',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Practice"
        className="!text-black p-1 !font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.practice}</TextCell>,
  },
  {
    accessorKey: 'coPay',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="CoPay"
        className="!text-black w-full p-1 text-center !font-medium"
      />
    ),
    columns: [
      {
        accessorKey: 'coPay.due',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            label="Due"
            className="!text-black p-1 !font-medium"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.coPay?.due} </TextCell>,
      },
      {
        accessorKey: 'coPay.paid',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            label="Paid"
            className="!text-black p-1 !font-medium"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.coPay?.paid} </TextCell>,
      },
    ],
  },
  {
    accessorKey: 'coins',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="CoIns"
        className="!text-black w-full p-1 text-center !font-medium"
      />
    ),
    columns: [
      {
        accessorKey: 'coins.due',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            label="Due"
            className="!text-black p-1 !font-medium"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.coins?.due} </TextCell>,
      },
      {
        accessorKey: 'coins.paid',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            label="Paid"
            className="!text-black p-1 !font-medium"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.coins?.paid} </TextCell>,
      },
    ],
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Balance"
        className="!text-black w-full p-1 text-center !font-medium"
      />
    ),
    columns: [
      {
        accessorKey: 'balance.due',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            label="Due"
            className="!text-black p-1 !font-medium"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.balance?.due} </TextCell>,
      },
      {
        accessorKey: 'balance.paid',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            label="Paid"
            className="!text-black p-1 !font-medium"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.balance?.paid}</TextCell>,
      },
    ],
  },
  {
    id: 'hx',
    header: () => (
      <ColumnHeader label="Hx" className="!text-black p-1 !font-medium" />
    ),
    cell: ({ row }) => <HistoryCell row={row} />,
  },
]

export { columns }
