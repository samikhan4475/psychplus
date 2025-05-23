'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { PatientReferral, Sort } from '@/types'
import {
  formatDate,
  formatDateTime,
  getMaskedPhoneNumber,
  getNewSortDir,
  getPatientFullName,
} from '@/utils'
import {
  GenderLabelCell,
  ServiceNameCell,
} from '../referrals/patient-referrals-widget/cells'
import {
  ActionCell,
  CollapseCell,
  ContactMadeSelectCell,
  ReferralStatusCell,
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
      id: 'ptname',
      header: () => <ColumnHeader label="Name" />,
      cell: ({ row: { original } }) => {
        return (
          <LongTextCell className="min-w-24">
            {original?.patientName && getPatientFullName(original?.patientName)}
          </LongTextCell>
        )
      },
    },
    {
      id: 'pt-status',
      header: () => <ColumnHeader label="User Status" />,
      cell: GenderLabelCell,
    },
    {
      id: 'age',
      header: () => <ColumnHeader label="Age" />,
      cell: ({ row: { original } }) => (
        <TextCell>{original?.patientAge}</TextCell>
      ),
    },
    {
      id: 'patient-gender',
      header: () => <ColumnHeader label="Gender" />,
      cell: ({ row: { original } }) => (
        <TextCell>{original?.patientGender}</TextCell>
      ),
    },
    {
      id: 'mrn',
      header: () => <ColumnHeader label="MRN" />,
      cell: ({ row: { original } }) => (
        <TextCell className="truncate">{original?.patientMrn}</TextCell>
      ),
    },
    {
      id: 'dob',
      header: () => <ColumnHeader label="DOB" />,
      cell: ({ row: { original } }) => (
        <TextCell className="truncate">
          {original?.patientDateOfBirth &&
            formatDate(original?.patientDateOfBirth, 'MM/dd/yyyy')}
        </TextCell>
      ),
    },
    {
      id: 'phone',
      header: () => <ColumnHeader label="Phone" />,
      cell: ({ row: { original } }) => (
        <TextCell className="truncate">
          {getMaskedPhoneNumber(
            original?.contactDetails?.phoneNumbers?.[0]?.number ?? '',
          ) ?? ''}
        </TextCell>
      ),
    },
    {
      id: 'email',
      header: () => <ColumnHeader label="Email" />,
      cell: ({ row: { original } }) => (
        <TextCell className="truncate">
          {original?.contactDetails?.email}
        </TextCell>
      ),
    },
    {
      id: 'state',
      header: () => <ColumnHeader label="State" />,
      cell: ({ row: { original } }) => (
        <TextCell>{original?.stateCode}</TextCell>
      ),
    },
    {
      id: 'city',
      header: () => <ColumnHeader label="City" />,
      cell: ({ row: { original } }) => (
        <TextCell className="truncate">{original?.city}</TextCell>
      ),
    },
    {
      id: 'zip',
      header: () => <ColumnHeader label="Zip" />,
      cell: ({ row: { original } }) => <TextCell>{original?.zip}</TextCell>,
    },
    {
      id: 'primaryInsurance',
      header: () => <ColumnHeader label="Primary Insurance" />,
      cell: ({ row: { original } }) => (
        <TextCell>
          {getPrimaryInsuranceName(original.patientInsurancePolicies)}
        </TextCell>
      ),
    },
    {
      id: 'secondaryInsurance',
      header: () => <ColumnHeader label="Secondary Insurance" />,
      cell: ({ row: { original } }) => (
        <TextCell>
          {getSecondaryInsuranceName(original.patientInsurancePolicies)}
        </TextCell>
      ),
    },
    {
      id: 'service',
      header: () => <ColumnHeader label="Service" />,
      cell: ServiceNameCell,
    },
    {
      id: 'referralDate',
      header: ({ column }) => (
        <ColumnHeader
          label="Order date/time"
          sortable
          sortDir={getNewSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row: { original: referral } }) => (
        <TextCell className="truncate" wrapperClass="bg-gray-3 w-full">
          {referral?.referralDate &&
            formatDateTime(referral?.referralDate, false)}
        </TextCell>
      ),
    },
    {
      id: 'visitID',
      header: () => <ColumnHeader label="Visit ID" />,
      cell: ({ row: { original } }) => (
        <TextCell className="truncate">{original?.appointmentId}</TextCell>
      ),
    },
    {
      id: 'service-status',
      header: () => <ColumnHeader label="Service Priority Status" />,
      cell: ({ row: { original } }) => (
        <TextCell className="truncate" wrapperClass="bg-gray-3 w-full">
          {original?.servicesStatus}
        </TextCell>
      ),
    },
    {
      id: 'initiated-by',
      header: () => <ColumnHeader label="Initiated By" />,
      cell: ({ row: { original } }) => (
        <TextCell className="truncate">
          {original?.metadata?.createdByFullName}
        </TextCell>
      ),
    },
    {
      id: 'provider',
      header: () => <ColumnHeader label="Provider" />,
      cell: ({ row: { original } }) => (
        <TextCell className="truncate">
          {original?.referredByName &&
            getPatientFullName(original?.referredByName)}
        </TextCell>
      ),
    },
    {
      id: 'contact-made',
      header: () => <ColumnHeader label="Contact Made" />,
      cell: ContactMadeSelectCell,
    },
    {
      id: 'referral-status',
      header: () => <ColumnHeader label="Referral Status" />,
      cell: ReferralStatusCell,
    },

    {
      id: 'next-visit',
      header: () => <ColumnHeader label="Next Visit" />,
      cell: ({ row: { original } }) => (
        <TextCell className="truncate" wrapperClass="bg-gray-3 w-full">
          {formatDate(original?.nextVisit, 'MM/dd/yy') ?? 'N/A'}
        </TextCell>
      ),
    },
    {
      id: 'visit-hx',
      header: () => <ColumnHeader label="Visit Hx" />,
      cell: ({ row: { original } }) => (
        <TextCell className="truncate" wrapperClass="bg-gray-3 w-full">
          {formatDate(original?.patientVisitHistory, 'MM/dd/yy') ?? 'N/A'}
        </TextCell>
      ),
    },
    {
      id: 'comments',
      header: () => <ColumnHeader label="Comments" />,
      size: 40,
      cell: ({ row: { original } }) => (
        <LongTextCell className="max-w-32">{original.comments}</LongTextCell>
      ),
    },

    {
      id: 'action',
      header: () => <ColumnHeader label="Action" />,
      cell: ActionCell,
    },
  ]
}

export { columns }
