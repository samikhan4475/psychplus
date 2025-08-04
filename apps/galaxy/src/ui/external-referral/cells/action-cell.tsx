'use client'

import { useState } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/react/shallow'
import { PropsWithRow } from '@/components'
import { NewPatient } from '@/types'
import { AddPatient } from '@/ui/patient/add-patient'
import { AddVisit } from '@/ui/visit/add-visit'
import {
  associateAppointmentAction,
  associateMatchingReferralAction,
} from '../actions'
import { useStore } from '../store'
import { transformOutPatientRow } from '../transform'
import { AppointmentData, Patient } from '../types'
import { LinkReferral } from './link-referral'

const ActionCell = ({ row }: PropsWithRow<Patient>) => {
  const [loading, setLoading] = useState(false)
  const { formValues, search } = useStore(
    useShallow((state) => ({
      formValues: state.formValues,
      search: state.search,
    })),
  )

  const matchStatus = row.original?.matchStatus
  const isNew = matchStatus === 'New'
  const isExisting = matchStatus === 'Existing'
  const isReconcile = matchStatus === 'Reconcile'
  const actionButtonClasses =
    'text-black h-full min-h-0  min-w-0 rounded-[4px] [box-shadow:inset_0_0_0_0.5px_#9E9898CC] disabled:cursor-not-allowed disabled:opacity-50'

  const onPatientAdd = async (newPatient: NewPatient) => {
    setLoading(true)
    const response = await associateMatchingReferralAction(
      newPatient.user.id,
      row.original.id.toString(),
    )
    if (response.state === 'success') {
      toast.success('Referral linked successfully!')
      search(formValues, 1, true)
    } else {
      toast.error(response.error ?? 'Failed to link referral!')
    }
    setLoading(false)
  }

  const handleAddVisitResponse = async (responseData?: AppointmentData) => {
    setLoading(true)
    if (!responseData?.appointments || responseData.appointments.length === 0) {
      toast.error('No appointment data received!')
      setLoading(false)
      return
    }
    const appointmentId = responseData?.appointments?.[0].id
    const response = await associateAppointmentAction(
      appointmentId,
      row.original.id.toString(),
    )

    if (response.state === 'success') {
      toast.success('Appointment associated successfully!')
      search(formValues, 1, true)
    } else {
      toast.error(response.error ?? 'Failed to associate appointment!')
    }
    setLoading(false)
  }

  return (
    <Flex
      onClick={(e) => e.stopPropagation()}
      gap="1"
      justify="center"
      className="w-full truncate"
    >
      {isReconcile && <LinkReferral row={row} />}
      {(isExisting || isReconcile) && (
        <AddVisit
          showAddUser={false}
          patient={transformOutPatientRow(row.original)}
          onAdd={handleAddVisitResponse}
        >
          <Button
            size="1"
            variant="outline"
            disabled={isReconcile}
            className={actionButtonClasses}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            Book
          </Button>
        </AddVisit>
      )}

      {isNew && (
        <AddPatient onPatientAdd={onPatientAdd}>
          <Button
            size="1"
            variant="outline"
            className={actionButtonClasses}
            disabled={loading}
          >
            Add New
          </Button>
        </AddPatient>
      )}
    </Flex>
  )
}

export { ActionCell }
