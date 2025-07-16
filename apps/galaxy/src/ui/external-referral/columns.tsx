'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import {
  getPatientAge,
  getPatientDOB,
  getPatientFullName,
  getSlashedPaddedDateString,
} from '@/utils'
import {
  ActionCell,
  ContactMadeSelectCell,
  ExternalReferralHistoryCell,
  FacesheetAttachmentCell,
  MedicalRecordAttachmentCell,
  ServiceDateTimeCell,
} from './cells'
import { Patient } from './types'

const columns: ColumnDef<Patient>[] = [
  {
    id: 'hx',
    header: () => <ColumnHeader label="Hx" />,
    cell: ExternalReferralHistoryCell,
    maxSize: 50,
  },
  {
    id: 'patientDetail',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Patient Details" />
    ),
    columns: [
      {
        id: 'patientName',
        header: () => <ColumnHeader label="Name" />,
        cell: ({ row: { original } }) => (
          <LongTextCell className="min-w-24">
            {getPatientFullName(original.patientName)}
          </LongTextCell>
        ),
      },
      {
        id: 'pt-status',
        header: () => <ColumnHeader label="User Status" />,
        cell: ({ row: { original } }) => (
          <TextCell>{original?.status}</TextCell>
        ),
      },
      {
        id: 'patientAge',
        header: () => <ColumnHeader label="Age" />,
        cell: ({ row: { original } }) => (
          <TextCell>
            {original?.patientDateOfBirth &&
              getPatientAge(original.patientDateOfBirth)}
          </TextCell>
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
          <TextCell className="truncate">
            {original?.patientExternalMrn}
          </TextCell>
        ),
      },
      {
        id: 'patientDob',
        header: () => <ColumnHeader label="DOB" />,
        cell: ({ row: { original } }) => (
          <TextCell className="truncate">
            {original?.patientDateOfBirth &&
              getPatientDOB(original?.patientDateOfBirth)}
          </TextCell>
        ),
      },
      {
        id: 'patientPhone',
        header: () => <ColumnHeader label="Phone" />,
        cell: ({ row: { original } }) => (
          <TextCell className="truncate">
            {original?.patientContactDetails?.phoneNumbers?.[0]?.number}
          </TextCell>
        ),
      },
      {
        id: 'patientEmail',
        header: () => <ColumnHeader label="Email" />,
        cell: ({ row: { original } }) => (
          <TextCell className="truncate">
            {original?.patientContactDetails?.email}
          </TextCell>
        ),
      },
      {
        id: 'patientState',
        header: () => <ColumnHeader label="Residence (State)" />,
        cell: ({ row: { original } }) => (
          <TextCell className="truncate">
            {original?.patientContactDetails?.addresses?.[0]?.state}
          </TextCell>
        ),
      },
      {
        id: 'patientCity',
        header: () => <ColumnHeader label="City" />,
        cell: ({ row: { original } }) => (
          <TextCell className="truncate">
            {original?.patientContactDetails?.addresses?.[0]?.city}
          </TextCell>
        ),
      },
      {
        id: 'patientZipCode',
        header: () => <ColumnHeader label="Zip" />,
        cell: ({ row: { original } }) => (
          <TextCell className="truncate">
            {original?.patientContactDetails?.addresses?.[0]?.postalCode}
          </TextCell>
        ),
      },
    ],
  },
  {
    id: 'organizationType',
    header: () => <ColumnHeader label="Organization type" />,
    cell: ({ row: { original } }) => (
      <LongTextCell className="min-w-24">
        {original?.organizationType}
      </LongTextCell>
    ),
  },
  {
    id: 'referrer',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Referrering Organization" />
    ),
    columns: [
      {
        id: 'name',
        header: () => <ColumnHeader label="Name" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell className="truncate">{patient?.referrerName}</TextCell>
        ),
      },
      {
        id: 'phone',
        header: () => <ColumnHeader label="Phone" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell className="truncate">
            {patient.referrerContactDetails?.phoneNumbers?.[0]?.number}
          </TextCell>
        ),
      },
      {
        id: 'email',
        header: () => <ColumnHeader label="Email" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell>{patient?.referrerContactDetails?.email}</TextCell>
        ),
      },
    ],
  },

  {
    id: 'referrerOrderDetails',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Referral Order Details" />
    ),
    columns: [
      {
        id: 'service-date-time',
        header: () => <ColumnHeader label="Order Date/Time" />,
        cell: ServiceDateTimeCell,
      },
      {
        id: 'service',
        header: () => <ColumnHeader label="Service" />,
        cell: ({ row: { original } }) => (
          <TextCell className="truncate">{original?.requestedService}</TextCell>
        ),
      },
      {
        id: 'referral-status',
        header: () => <ColumnHeader label="Referral Status" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell>{patient?.referrerStatus}</TextCell>
        ),
      },
      {
        id: 'additionalComments',
        header: () => <ColumnHeader label="Comments" />,
        cell: ({ row: { original } }) => (
          <TextCell>{original?.additionalComments}</TextCell>
        ),
      },
    ],
  },
  {
    id: 'facesheet',
    header: () => <ColumnHeader label="Facesheet" />,
    cell: FacesheetAttachmentCell,
  },
  {
    id: 'medical-record',
    header: () => <ColumnHeader label="Medical Record" />,
    cell: MedicalRecordAttachmentCell,
  },
  {
    id: 'dischargeTime',
    header: () => <ColumnHeader label="DC Date" />,
    cell: ({ row: { original } }) => (
      <TextCell>
        {getSlashedPaddedDateString(original?.dischargeTime) ?? ''}
      </TextCell>
    ),
  },
  {
    id: 'dischargeSummary',
    header: () => <ColumnHeader label="Discharge Summary" />,
    cell: ({ row: { original } }) => (
      <TextCell>{original?.dischargeSummary ?? ''}</TextCell>
    ),
  },

  {
    id: 'request',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Referral Service Details" />
    ),
    columns: [
      {
        id: 'contact-made',
        header: () => <ColumnHeader label="Contact Initiated Status" />,
        cell: ContactMadeSelectCell,
      },
      {
        id: 'clinicLocation',
        header: () => <ColumnHeader label="Location" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell className="truncate">
            {patient?.requestedLocationName}
          </TextCell>
        ),
      },
      {
        id: 'provider',
        header: () => <ColumnHeader label="Provider" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell className="truncate">
            {patient?.requestedProviderName &&
              getPatientFullName(patient.requestedProviderName)}
          </TextCell>
        ),
      },
      {
        id: 'primary-insurance',
        header: () => <ColumnHeader label="Primary Insurance" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell className="truncate">{patient?.primaryInsurance}</TextCell>
        ),
      },
      {
        id: 'secondary-insurance',
        header: () => <ColumnHeader label="Secondary Insurance" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell className="truncate">
            {patient?.secondaryInsurance}
          </TextCell>
        ),
      },
    ],
  },
  {
    id: 'next-visit',
    header: () => <ColumnHeader label="Next Visit" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.upcomingAppointmentDate ?? ''}
      </TextCell>
    ),
  },
  {
    id: 'visit-hx',
    header: () => <ColumnHeader label="Visit Hx" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.mostRecentAppointmentDate ?? ''}
      </TextCell>
    ),
  },
  {
    id: 'match-status',
    header: () => <ColumnHeader label="Status" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.matchStatus ?? ''}</TextCell>
    ),
  },
  {
    id: 'isLinked',
    header: () => <ColumnHeader label="Association" />,
    cell: ({ row: { original } }) => (
      <TextCell>{original?.matchStatus === 'Existing' ? 'Yes' : 'No'}</TextCell>
    ),
  },
  {
    id: 'referrerFacility',
    header: () => <ColumnHeader label="Referral Reason" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.referrerFacility}</TextCell>
    ),
  },
  {
    id: 'action',
    header: () => <ColumnHeader label="Action" />,
    cell: ActionCell,
  },
]

export { columns }
