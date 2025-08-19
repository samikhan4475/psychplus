'use client'

import { useEffect, useState } from 'react'
import { Box, Button, Dialog, Flex, ScrollArea, Text } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  LongTextCell,
  TextCell,
} from '@/components'
import { NewPatient } from '@/types'
import {
  formatDateOfBirth,
  getPatientAge,
  getPatientFullName,
  getSlashedPaddedDateString,
} from '@/utils'
import { AddPatient } from '../patient/add-patient'
import {
  associateMatchingReferralAction,
  getMatchingReferralAction,
} from './actions'
import { LinkExternalReferralButton } from './link-external-referral-button'
import { Match, Patient } from './types'

interface DeleteDialogProps {
  patient: Patient
  open?: boolean
  onClose?: () => void
}
const columns = (patient: Patient): ColumnDef<Match>[] => [
  {
    id: 'name',
    header: () => <ColumnHeader label="Name" />,
    cell: ({ row: { original } }) => (
      <LongTextCell className="min-w-24">
        {getPatientFullName(original.name)}
      </LongTextCell>
    ),
  },
  {
    id: 'patientAge',
    header: () => <ColumnHeader label="Age" />,
    cell: ({ row: { original } }) => (
      <TextCell>{getPatientAge(original.dateOfBirth)}</TextCell>
    ),
  },
  {
    id: 'patient-gender',
    header: () => <ColumnHeader label="Gen." />,
    cell: ({ row: { original } }) => <TextCell>{original?.gender}</TextCell>,
  },
  {
    id: 'pt-status',
    header: () => <ColumnHeader label="Pt Status" />,
    cell: ({ row: { original } }) => (
      <TextCell>{original?.recordStatus}</TextCell>
    ),
  },
  {
    id: 'p&c',
    header: () => <ColumnHeader label="P&C" />,
    cell: ({ row: { original } }) => <TextCell>{original?.pAndC}</TextCell>,
  },
  {
    id: 'cc',
    header: () => <ColumnHeader label="CC" />,
    cell: ({ row: { original } }) => <TextCell>{original?.cc}</TextCell>,
  },
  {
    id: 'mrn',
    header: () => <ColumnHeader label="MRN" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.patientExternalMrn}</TextCell>
    ),
  },
  {
    id: 'patientDob',
    header: () => <ColumnHeader label="DOB" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {formatDateOfBirth(original?.dateOfBirth)}
      </TextCell>
    ),
  },
  {
    id: 'patientPhone',
    header: () => <ColumnHeader label="Phone" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.phoneNumber}</TextCell>
    ),
  },
  {
    id: 'patientEmail',
    header: () => <ColumnHeader label="Email" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.email}</TextCell>
    ),
  },
  {
    id: 'patientCity',
    header: () => <ColumnHeader label="City" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.location?.city}</TextCell>
    ),
  },
  {
    id: 'patientZipCode',
    header: () => <ColumnHeader label="Zip" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.location?.postalCode}</TextCell>
    ),
  },
  {
    id: 'primary-insurance',
    header: () => <ColumnHeader label="Insurance" />,
    cell: ({ row: { original } }) => (
      <LongTextCell className="min-w-24">
        {original?.primaryInsurance}
      </LongTextCell>
    ),
  },
  {
    id: 'user-created',
    header: () => <ColumnHeader label="User Created" />,
    cell: ({ row: { original } }) => (
      <LongTextCell className="min-w-24">
        {getSlashedPaddedDateString(original.createdOn)}
      </LongTextCell>
    ),
  },
  {
    id: 'last-sign-in',
    header: () => <ColumnHeader label="Last Sign-In" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.mostRecentAppointmentDate ?? ''}
      </TextCell>
    ),
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
    id: 'actions',
    header: () => <ColumnHeader label="Actions" />,
    cell: ({ row }) => (
      <LinkExternalReferralButton row={row} externalReferralPatient={patient} />
    ),
  },
]

const LinkDuplicateExternalReferrals = ({
  onClose,
  open,
  patient,
}: DeleteDialogProps) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Match[]>([])

  useEffect(() => {
    if (open) {
      setLoading(true)
      getMatchingReferralAction(patient).then((response) => {
        if (response.state === 'error') {
          toast.error(response.error)
        } else if (response.state === 'success') {
          setData(response?.data?.matches)
        }
        setLoading(false)
      })
    } else {
      setData([])
    }
  }, [open, patient])

  const onPatientAdd = async (newPatient: NewPatient) => {
    setLoading(true)

    const response = await associateMatchingReferralAction(
      newPatient.user.id,
      patient.id.toString(),
    )
    if (response.state === 'success') {
      toast.success('Referral linked successfully!')
    } else {
      toast.error(response.error ?? 'Failed to link referral!')
    }
    setLoading(false)
  }
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content className="relative max-w-[847px] rounded-2 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="6" weight="bold" className="m-0 mb-2 mt-2">
          Potential Duplicate
        </Dialog.Title>
        {loading ? (
          <LoadingPlaceholder className="h-20" />
        ) : (
          <Box className="border-pp-grey mt-2 rounded-[4px] border">
            <Flex
              className="bg-pp-table-subRows pb-1 pl-2 pr-2 pt-1"
              justify="between"
              align="center"
            >
              <Text size="2" weight={'bold'} className="text-black ">
                Potential Duplicates Found Review & Link
              </Text>

              <AddPatient onPatientAdd={onPatientAdd}>
                <Button
                  size="1"
                  variant="outline"
                  className="text-black h-full min-h-0  min-w-0 rounded-[4px] [box-shadow:inset_0_0_0_0.5px_#9E9898CC] disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={loading}
                >
                  Add New
                </Button>
              </AddPatient>
            </Flex>
            <ScrollArea className="max-h-44 w-full p-2">
              <DataTable
                columns={columns(patient)}
                data={data}
                sticky
                theadClass="z-[1]"
                disablePagination
              />
            </ScrollArea>
          </Box>
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { LinkDuplicateExternalReferrals }
