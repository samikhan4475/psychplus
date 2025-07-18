'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { PatientReferral, Sort } from '@/types'
import { formatUTCDate, getSlashedPaddedDateString, getSortDir } from '@/utils'
import { ServiceNameCell } from '../referrals/patient-referrals-widget/cells'
import {
  ActionCell,
  CollapseCell,
  ContactMadeSelectCell,
  DiagnosisCell,
  LocationCell,
  OrderDetailLocationCell,
  OrderDetailProviderCell,
  PatientChartCell,
  PatientEducationCell,
  PatientInfoCell,
  PriorAuthStatusCell,
  ProcurementCell,
  ProviderCell,
  ReferralStatusCell,
  RemsEnrolledCell,
  ServicePriorityStatusCell,
  VisitTypeCell,
} from './cells'
import { getPrimaryInsuranceName, getSecondaryInsuranceName } from './utils'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<PatientReferral>[] => {
  return [
    {
      id: 'referral-history',
      header: () => <ColumnHeader label="Hx" />,
      cell: CollapseCell,
      size: 20,
    },
    {
      id: 'patientName.firstName',
      header: () => <ColumnHeader label="Patient Name" />,
      cell: PatientInfoCell,
    },
    {
      id: 'referral-order-details',
      header: ({ column }) => (
        <ColumnHeader column={column} label="Referral Order Details" />
      ),
      columns: [
        {
          id: 'serviceDateTime',
          header: ({ column }) => (
            <ColumnHeader label="Order Date/Time" column={column} />
          ),
          cell: ({ row }) => (
            <TextCell>
              {row.original.visitDateTime
                ? formatUTCDate(row.original.visitDateTime)
                : ''}
            </TextCell>
          ),
        },
        {
          id: 'service',
          header: ({ column }) => (
            <ColumnHeader label="Service" column={column} />
          ),
          cell: ServiceNameCell,
        },
        {
          id: 'appointment.visitType',
          header: ({ column }) => (
            <ColumnHeader label="Visit Type" column={column} />
          ),
          cell: VisitTypeCell,
        },
        {
          id: 'visitId',
          header: ({ column }) => (
            <ColumnHeader label="Visit ID" column={column} />
          ),
          cell: ({ row }) => (
            <PatientChartCell
              labelText={row.original.appointmentId}
              referral={row.original}
            />
          ),
        },
        {
          id: 'servicesStatus',
          header: ({ column }) => (
            <ColumnHeader label="Service Priority Status" column={column} />
          ),
          cell: ServicePriorityStatusCell,
        },
        {
          id: 'referredByName',
          header: ({ column }) => (
            <ColumnHeader label="Initiated By" column={column} />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original.initiatedByUserRole}</TextCell>
          ),
        },
        {
          id: 'appointment?.providerName',
          header: ({ column }) => (
            <ColumnHeader label="Provider" column={column} />
          ),
          cell: ProviderCell,
        },
        {
          id: 'appointment?.locationName1',
          header: ({ column }) => (
            <ColumnHeader label="Location" column={column} />
          ),
          cell: LocationCell,
        },
        {
          id: 'resourceStatus',
          header: ({ column }) => (
            <ColumnHeader label="Referral Status" column={column} />
          ),
          cell: ReferralStatusCell,
        },
        {
          id: 'comments',
          header: ({ column }) => (
            <ColumnHeader label="Comments" column={column} />
          ),
          cell: ({ row }) => <TextCell>{row.original.comments}</TextCell>,
        },
      ],
    },
    {
      id: 'referral-service-details',
      header: ({ column }) => (
        <ColumnHeader column={column} label="Referral Service Details" />
      ),
      columns: [
        {
          id: 'metadata?.createdOn',
          header: ({ column }) => (
            <ColumnHeader
              label="Contact Initiated Status"
              column={column}
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
            />
          ),
          cell: ContactMadeSelectCell,
        },
        {
          id: 'appointment?.locationName',
          header: ({ column }) => (
            <ColumnHeader label="Location" column={column} />
          ),
          cell: OrderDetailLocationCell,
        },
        {
          id: 'providerName',
          header: ({ column }) => (
            <ColumnHeader label="Provider" column={column} />
          ),
          cell: OrderDetailProviderCell,
        },
        {
          id: 'patientEducation',
          header: ({ column }) => (
            <ColumnHeader label="Patient Education" column={column} />
          ),
          cell: PatientEducationCell,
        },
        {
          id: 'insurancePolicies',
          header: ({ column }) => (
            <ColumnHeader label="Primary Insurance" column={column} />
          ),
          cell: ({ row: { original } }) => (
            <TextCell>
              {getPrimaryInsuranceName(original.patientInsurancePolicies)}
            </TextCell>
          ),
        },
        {
          id: 'patientInsurancePolicies',
          header: ({ column }) => (
            <ColumnHeader label="Secondary Insurance" column={column} />
          ),
          cell: ({ row: { original } }) => (
            <TextCell>
              {getSecondaryInsuranceName(original.patientInsurancePolicies)}
            </TextCell>
          ),
        },
        {
          id: 'priorAuthStatus',
          header: ({ column }) => (
            <ColumnHeader label="Prior Auth Status" column={column} />
          ),
          cell: PriorAuthStatusCell,
        },
        {
          id: 'diagnosis',
          header: ({ column }) => (
            <ColumnHeader label="Diagnosis" column={column} />
          ),
          cell: DiagnosisCell,
        },
        {
          id: 'procurement',
          header: ({ column }) => (
            <ColumnHeader label="Procurement" column={column} />
          ),
          cell: ProcurementCell,
        },
        {
          id: 'remsEnrolled',
          header: ({ column }) => (
            <ColumnHeader label="REMS enrolled" column={column} />
          ),
          cell: RemsEnrolledCell,
        },
      ],
    },
    {
      accessorKey: 'nextVisit',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Next Visit" />
      ),
      cell: ({ row: { original } }) => (
        <TextCell className="truncate">
          {original?.nextVisit
            ? getSlashedPaddedDateString(original?.nextVisit)
            : 'N/A'}
        </TextCell>
      ),
    },
    {
      id: 'visit-hx',
      accessorKey: 'patientVisitHistory',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Visit Hx" />
      ),
      cell: ({ row: { original } }) => (
        <TextCell className="truncate">
          {original?.patientVisitHistory
            ? getSlashedPaddedDateString(original?.patientVisitHistory)
            : 'N/A'}
        </TextCell>
      ),
    },
    {
      id: 'action',
      header: () => <ColumnHeader label="Action" />,
      cell: ActionCell,
      size: 60,
    },
  ]
}

export { columns }
