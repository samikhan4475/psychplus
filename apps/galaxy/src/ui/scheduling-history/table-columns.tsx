'use client'

import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ColumnHeader, TextCell } from '@/components'
import { Sort } from '@/types'
import { getSortDir } from '@/utils'
import {
  FacilityAdmissionCell,
  HistoryCell,
  VisitStatusCell,
  VisitTypeCell,
} from './cells'
import { FACILITY_ADMISION_ID_CHECK } from './constants'
import { SchedulingHistoryData } from './types'

const getSchedulingColumns = (
  isTCMVisitType: boolean,
  sort?: Sort,
  onSort?: (column: string) => void,
) => {
  const dcDateNameColumns: ColumnDef<SchedulingHistoryData>[] = [
    {
      id: 'dischargeDate',
      accessorKey: 'dcDate',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          column={column}
          label="DC Date"
          className="!text-black p-1 !font-medium"
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original.dischargeHospitalDate &&
            format(
              new Date(row.original.dischargeHospitalDate),
              'MM/dd/yyyy HH:mm',
            )}
        </TextCell>
      ),
    },
    {
      id: 'DischargeHospitalName',
      accessorKey: 'dcHospiceName',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          column={column}
          label="DC Hospital Name"
          className="!text-black p-1 !font-medium"
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.dischargeHospitalName} </TextCell>
      ),
    },
  ]
  const columns: ColumnDef<SchedulingHistoryData>[] = [
    {
      id: 'visitNumber',
      accessorKey: 'visitNumber',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Visit Number"
          column={column}
          className="!text-black p-1 !font-medium"
        />
      ),

      cell: ({ row }) => <TextCell>{row.original.visitId} </TextCell>,
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
          id: 'facilityAdmissionId',
          accessorKey: 'facilityAdmission.id',
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
              label="ID"
              className="!text-black p-1 !font-medium"
              column={column}
            />
          ),
          cell: ({ row }) => (
            <TextCell>
              {row.original.facilityAdmissionId !==
                FACILITY_ADMISION_ID_CHECK && row.original.facilityAdmissionId}
            </TextCell>
          ),
        },
        {
          id: 'admittingProvider',
          accessorKey: 'facilityAdmission.admittingProvider',
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
              label="Admitting Provider"
              column={column}
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => (
            <TextCell>
              {row.original.facilityAdmissionId !==
                FACILITY_ADMISION_ID_CHECK &&
                row.original.admittingProviderName}
            </TextCell>
          ),
        },
        {
          id: 'admissionDate',
          accessorKey: 'facilityAdmission.admitDateTime',
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
              label="Admit date/time"
              column={column}
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => (
            <TextCell>
              {row.original.facilityAdmissionId !==
                FACILITY_ADMISION_ID_CHECK &&
                row.original.admissionDateTime &&
                format(
                  new Date(row.original.admissionDateTime),
                  'MM/dd/yyyy HH:mm',
                )}
            </TextCell>
          ),
        },
        {
          id: 'dischargeVisitSequenceDate',
          accessorKey: 'facilityAdmission.dischargeDate',
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
              label="Discharge date"
              column={column}
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => (
            <TextCell>
              {row.original.facilityAdmissionId !==
                FACILITY_ADMISION_ID_CHECK &&
                row.original.dischargeVisitSequenceDate &&
                format(
                  new Date(row.original.dischargeVisitSequenceDate),
                  'MM/dd/yyyy HH:mm',
                )}
            </TextCell>
          ),
        },
        {
          id: 'hx',
          size: 50,
          header: () => (
            <ColumnHeader label="Hx" className="!text-black p-1 !font-medium" />
          ),
          cell: ({ row }) => {
            return row.original.facilityAdmissionId !==
              FACILITY_ADMISION_ID_CHECK ? (
              <FacilityAdmissionCell row={row} />
            ) : null
          },
        },
      ],
    },
    {
      id: 'appointmentDateTime',
      accessorKey: 'dateOfService',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Date of Service"
          column={column}
          className="!text-black p-1 !font-medium"
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {format(
            new Date(row.original.appointmentDateTime),
            'MM/dd/yyy HH:mm',
          )}
        </TextCell>
      ),
    },
    {
      id: 'visitType',
      accessorKey: 'visitType',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          column={column}
          label="Visit Type"
          className="!text-black p-1 !font-medium"
        />
      ),
      cell: ({ row }) => <VisitTypeCell row={row} />,
    },
    {
      id: 'locationName',
      accessorKey: 'location',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          column={column}
          label="Location"
          className="!text-black p-1 !font-medium"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.locationName}</TextCell>,
    },
    {
      id: 'serviceOffered',
      accessorKey: 'service',
      header: ({ column }) => (
        <ColumnHeader
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          column={column}
          label="Service"
          className="!text-black p-1 !font-medium"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.serviceOffered}</TextCell>,
    },
    {
      id: 'providerType',
      accessorKey: 'providerType',
      header: ({ column }) => (
        <ColumnHeader
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          column={column}
          label="Provider Type"
          className="!text-black p-1 !font-medium"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.providerType} </TextCell>,
    },
    {
      id: 'provider',
      accessorKey: 'provider',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          column={column}
          label="Provider"
          className="!text-black p-1 !font-medium"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.providerName} </TextCell>,
    },
    {
      id: 'cosignerName',
      accessorKey: 'cosignerName',
      header: ({ column }) => (
        <ColumnHeader
          clientSideSort
          column={column}
          label="Cosigner"
          className="!text-black p-1 !font-medium"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.cosignerName} </TextCell>,
    },
    ...(isTCMVisitType ? dcDateNameColumns : []),
    {
      id: 'visitStatus',
      accessorKey: 'visitStatus',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          column={column}
          label="Visit Status"
          className="!text-black p-1 !font-medium"
        />
      ),
      cell: VisitStatusCell,
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
          id: 'primaryInsurancePlanName',
          accessorKey: 'insurance.primaryInsurance',
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
              column={column}
              label="Primary"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original.primaryInsuranceDescription}</TextCell>
          ),
        },
        {
          id: 'secondaryInsurancePlanName',
          accessorKey: 'insurance.secondaryInsurance',
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
              column={column}
              label="Secondary"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original.secondaryInsuranceDescription}</TextCell>
          ),
        },
      ],
    },

    {
      accessorKey: 'coPay',
      size: 100,
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          label="CoPay"
          className="!text-black w-full p-1 text-center !font-medium"
        />
      ),
      columns: [
        {
          id: 'coPayDue',
          accessorKey: 'coPay.due',
          size: 100,
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
              column={column}
              label="Due"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.coPayDue} </TextCell>,
        },
        {
          id: 'coPayPaid',
          accessorKey: 'coPay.paid',
          size: 100,
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
              column={column}
              label="Paid"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.coPayPaid} </TextCell>,
        },
      ],
    },
    {
      accessorKey: 'coins',
      size: 100,
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          label="CoIns"
          className="!text-black w-full p-1 text-center !font-medium"
        />
      ),
      columns: [
        {
          id: 'coInsDue',
          accessorKey: 'coins.due',
          size: 100,
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
              column={column}
              label="Due"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.coInsDue} </TextCell>,
        },
        {
          id: 'coInsPaid',
          accessorKey: 'coins.paid',
          size: 100,
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
              column={column}
              label="Paid"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.coInsPaid} </TextCell>,
        },
      ],
    },
    {
      accessorKey: 'balance',
      size: 100,

      header: ({ column }) => (
        <ColumnHeader
          column={column}
          label="Balance"
          className="!text-black w-full p-1 text-center !font-medium"
        />
      ),
      columns: [
        {
          id: 'balanceDue',
          accessorKey: 'balance.due',
          size: 100,

          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
              column={column}
              label="Due"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.balanceDue} </TextCell>,
        },
        {
          id: 'balancePaid',
          accessorKey: 'balance.paid',
          size: 100,
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
              column={column}
              label="Paid"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.balancePaid}</TextCell>,
        },
      ],
    },
    {
      id: 'hx',
      size: 50,
      header: () => (
        <ColumnHeader label="Hx" className="!text-black p-1 !font-medium" />
      ),
      cell: HistoryCell,
    },
  ]
  return columns
}

export { getSchedulingColumns }
