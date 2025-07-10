'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { PatientReferral, Sort } from '@/types'
import {
  formatDateOfBirth,
  formatUTCDate,
  getPatientFullName,
  getSlashedPaddedDateString,
  getSortDir,
} from '@/utils'
import {
  GenderLabelCell,
  ServiceNameCell,
} from '../referrals/patient-referrals-widget/cells'
import {
  ActionCell,
  AppointmentIdCell,
  CollapseCell,
  DiagnosisCell,
  LocationCell,
  OrderDetailLocationCell,
  OrderDetailProviderCell,
  PatientEducationCell,
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
      id: 'patientName',
      header: ({ column }) => (
        <ColumnHeader column={column} label="Patient Details" />
      ),
      columns: [
        {
          id: 'patientName.firstName',
          header: ({ column }) => <ColumnHeader label="Name" column={column} />,
          cell: ({ row }) => (
            <TextCell>{getPatientFullName(row.original.patientName)}</TextCell>
          ),
        },
        {
          id: 'patientStatus',
          header: ({ column }) => (
            <ColumnHeader label="Status" column={column} />
          ),
          cell: GenderLabelCell,
        },
        {
          id: 'patientAge',
          header: ({ column }) => <ColumnHeader label="Age" column={column} />,
          cell: ({ row }) => <TextCell>{row.original.patientAge}</TextCell>,
        },
        {
          id: 'patientGender',
          header: ({ column }) => <ColumnHeader label="Gen." column={column} />,
          cell: ({ row }) => <TextCell>{row.original.patientGender}</TextCell>,
        },
        {
          id: 'patientMrn',
          header: ({ column }) => <ColumnHeader label="MRN" column={column} />,
          cell: ({ row }) => <TextCell>{row.original.patientMrn}</TextCell>,
        },
        {
          id: 'patientDateOfBirth',
          header: ({ column }) => <ColumnHeader label="DOB" column={column} />,
          cell: ({ row }) => (
            <TextCell className="truncate">
              {row.original?.patientDateOfBirth &&
                formatDateOfBirth(row.original?.patientDateOfBirth)}
            </TextCell>
          ),
        },
        {
          id: 'contactDetails.phoneNumbers[0].number',
          header: ({ column }) => (
            <ColumnHeader label="Phone" column={column} />
          ),
          cell: ({ row }) => (
            <TextCell className="w-[100px]">
              {row.original.contactDetails?.phoneNumbers?.length
                ? row.original.contactDetails.phoneNumbers[0].number
                : ''}
            </TextCell>
          ),
        },
        {
          id: 'contactDetails?.email',
          header: ({ column }) => (
            <ColumnHeader label="Email" column={column} />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original.contactDetails?.email}</TextCell>
          ),
        },
        {
          id: 'contactDetails.addresses[0].state',
          header: ({ column }) => (
            <ColumnHeader label="Residence(State)" column={column} />
          ),
          cell: ({ row }) => <TextCell>{row.original.stateCode}</TextCell>,
        },
        {
          id: 'contactDetails.addresses[0].city',
          header: ({ column }) => <ColumnHeader label="City" column={column} />,
          cell: ({ row }) => (
            <TextCell>
              {row.original.contactDetails?.addresses?.length
                ? row.original.contactDetails.addresses[0].city
                : ''}
            </TextCell>
          ),
        },
        {
          id: 'contactDetails.addresses[0].postalCode',
          header: ({ column }) => <ColumnHeader label="Zip" column={column} />,
          cell: ({ row }) => (
            <TextCell>
              {row.original.contactDetails?.addresses?.length
                ? row.original.contactDetails.addresses[0].postalCode
                : ''}
            </TextCell>
          ),
        },
      ],
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
          cell: AppointmentIdCell,
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
          cell: ({ row }) => (
            <TextCell>
              {row.original.metadata?.createdOn
                ? formatUTCDate(row.original.metadata?.createdOn)
                : ''}
            </TextCell>
          ),
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
