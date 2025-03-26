'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/react/shallow'
import { FormContainer } from '@/components'
import { Appointment, BookVisitPayload } from '@/types'
import { getBookedAppointmentsAction } from '@/ui/schedule/client-actions'
import { bookVisitAction } from '@/ui/visit/client-actions'
import { AlertDialog } from './alert-dialog'
import { CalenderView } from './calender-view'
import { getProviderDefaultDuration } from './client-actions'
import { CreateFollowUpButton } from './create-follow-up-button'
import { FollowUpVisitAlert } from './follow-up-visit-alert'
import {
  FollowupDenialCheckbox,
  FollowupDenialReason,
  LocationDropdown,
  ProviderDropdown,
} from './form-fields'
import { NextDropdown } from './form-fields/next-dropdown'
import { schema, SchemaType } from './schema'
import { useStore } from './store'
import {
  getDefaultNext,
  getOffsetStartDate,
  sanitizeFormData,
  transformIn,
} from './utils'

const FollowUpForm = ({
  patientId,
  appointmentId,
}: {
  patientId: string
  appointmentId: string
}) => {
  const [loading, setLoading] = useState(false)
  const [appointment, setAppointment] = useState<Appointment>()
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [alertState, setAlertState] = useState<{
    statusCode: number
    message: string
  }>({
    message: '',
    statusCode: 0,
  })
  const {
    search,
    setAppointmentDate,
    setFollowupDenialReason,
    setIsFollowupDenied,
  } = useStore(
    useShallow((state) => ({
      search: state.search,
      setAppointmentDate: state.setAppointmentDate,
      setFollowupDenialReason: state.setFollowupDenialReason,
      setIsFollowupDenied: state.setIsFollowupDenied,
    })),
  )

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      next: '4 week',
      location: undefined,
      providerId: undefined,
    },
  })

  const fetchAppointmentData = async () => {
    setLoading(true)
    const response = await getBookedAppointmentsAction({
      patientIds: [Number(patientId)],
      appointmentIds: [Number(appointmentId)],
    })

    if (response.state === 'error') {
      setLoading(false)
      return setError(response.error || 'Failed to fetch appointment data')
    }

    const data = response.data?.[0] || {}
    setAppointment(data)
    setAppointmentDate(data.appointmentDate)
    setFollowupDenialReason(data.followUpDenialReason ?? '')
    setIsFollowupDenied(data.isFollowupDenied ?? false)
    form.resetField('next', {
      defaultValue: getDefaultNext(data.visitTypeCode ?? ''),
    })
    form.setValue('location', data.locationId)
    form.resetField('providerId', { defaultValue: `${data.providerId}` })
    setLoading(false)
  }

  useEffect(() => {
    fetchAppointmentData()
  }, [patientId, appointmentId])

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const response = await getProviderDefaultDuration(appointment!)
    if (response.state === 'error') return
    const duration = response.data
    const offsetStartDate = getOffsetStartDate(
      data.next,
      appointment?.appointmentDate ?? new Date().toISOString(),
    )

    const transformedAppointment = transformIn(appointment!, duration)
    const payload: BookVisitPayload = {
      ...transformedAppointment,
      startDate: offsetStartDate,
      locationId: data.location ?? '',
      specialistStaffId: data.providerId ? Number(data.providerId) : 0,
      isOverridePermissionProvided: data.isOverridePermissionProvided,
      isProceedPermissionProvided: data.isProceedPermissionProvided,
      patientId: Number(patientId),
    }
    const sanitizedData = sanitizeFormData(payload)

    bookVisitAction({
      ...sanitizedData,
      visitFrequency: `${sanitizedData.visitFrequency}`,
      isNewAdmissionIdRequired: !appointment?.isServiceTimeDependent,
      consultationDate: appointment?.appointmentDate,
    }).then((res) => {
      if (res.state === 'error') {
        if (res.status) {
          setIsAlertOpen(true)
          return setAlertState({
            message: res.error,
            statusCode: res.status ?? 0,
          })
        }
        toast.error(res.error ?? 'Failed to create follow up visit')
      } else {
        search({
          patientIds: [Number(patientId)],
          appointmentIds: [Number(appointmentId)],
        })
        toast.success('Follow up visit created!')
      }
    })
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <FollowUpVisitAlert
        isOpen={isAlertOpen}
        alertInfo={alertState}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={(data) => {
          setIsAlertOpen(false)
          onSubmit(data)
          setAlertState({ message: '', statusCode: 0 })
        }}
      />
      <AlertDialog
        message={error}
        setIsOpen={() => setError('')}
        isOpen={!!error}
      />
      <Flex className="gap-x-5" align="start" mb="2">
        <FollowupDenialCheckbox />
        <FollowupDenialReason />
      </Flex>
      <Flex align="center" gap="2">
        <NextDropdown />
        <LocationDropdown disabled={loading} />
        <ProviderDropdown appointment={appointment} disabled={loading} />

        <CreateFollowUpButton loading={loading} onSubmit={onSubmit} />
        <CalenderView
          appointmentDate={appointment?.appointmentDate}
          onVisitAdd={() => {
            search({
              patientIds: [Number(patientId)],
              appointmentIds: [Number(appointmentId)],
            })
            fetchAppointmentData()
          }}
          patient={{
            accessToken: `${appointment?.patientId}`,
            user: {
              id: appointment?.patientId ?? 0,
              legalName: {
                firstName: appointment?.name ?? '',
                lastName: '',
              },
            },
            patientStatus: appointment?.patientStatus ?? '',
            patientMrn: appointment?.patientMrn ?? '',
            gender: appointment?.gender ?? '',
            dob: appointment?.dob ?? '',
            state: appointment?.stateCode,
          }}
        />
      </Flex>
    </FormContainer>
  )
}

export { FollowUpForm }
