'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/react/shallow'
import { FormContainer } from '@/components'
import { VisitMediumEnum } from '@/enum'
import { Appointment, BookVisitPayload } from '@/types'
import { getStaffAction } from '@/ui/staff-credentialing/actions'
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
  VisitMediumDropdown,
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
  appointmentData,
  patientId,
  appointmentId,
}: {
  appointmentData: Appointment | undefined
  patientId: string
  appointmentId: string
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
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
    loading,
    search,
    fetchQuickNoteAppointment,
    setAppointmentDate,
    setFollowupDenialReason,
    setIsFollowupDenied,
  } = useStore(
    useShallow((state) => ({
      loading: state.loading,
      search: state.search,
      fetchQuickNoteAppointment: state.fetchQuickNoteAppointment,
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
      type: VisitMediumEnum.TeleVisit,
    },
  })

  useEffect(() => {
    const appointmentId = appointmentData?.id || appointmentData?.appointmentId
    if (!appointmentId) return
    setAppointment(appointmentData)
    setAppointmentDate(appointmentData.appointmentDate)
    setFollowupDenialReason(appointmentData.followUpDenialReason ?? '')
    setIsFollowupDenied(appointmentData.isFollowupDenied ?? false)
    if (appointmentData.isServiceTimeDependent) {
      form.resetField('providerId', {
        defaultValue: `${appointmentData.providerId}`,
      })
    }
    form.resetField('next', {
      defaultValue: getDefaultNext(
        appointmentData.visitTypeCode ?? '',
        appointmentData.isServiceTimeDependent,
      ),
    })
    form.setValue('location', appointmentData.locationId)
  }, [appointmentData])

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    if (!appointment) return
    setIsSubmitting(true)
    const staffResult = await getStaffAction(`${appointment?.providerId}`)
    if (staffResult.state === 'error') {
      toast.error(staffResult.error || 'Failed to fetch staff details')
      return
    }
    const userId = staffResult.data?.userId
    const response = await getProviderDefaultDuration(appointment, userId)
    if (response.state === 'error') {
      setIsSubmitting(false)
      return
    }
    const duration = response.data
    const offsetStartDate = getOffsetStartDate(
      data.next,
      appointment?.appointmentDate ?? new Date().toISOString(),
    )

    const transformedAppointment = transformIn(appointment, duration)
    const payload: BookVisitPayload = {
      ...transformedAppointment,
      startDate: offsetStartDate,
      locationId: data.location ?? '',
      specialistStaffId: data.providerId ? Number(data.providerId) : 0,
      isOverridePermissionProvided: data.isOverridePermissionProvided,
      isProceedPermissionProvided: data.isProceedPermissionProvided,
      isOverridePrimaryProvider: data.isOverridePrimaryProvider,
      patientId: Number(patientId),
      parentAppointmentId: Number(appointmentId),
    }
    const sanitizedData = sanitizeFormData(payload)

    bookVisitAction({
      ...sanitizedData,
      visitFrequency: `${sanitizedData.visitFrequency}`,
      isNewAdmissionIdRequired: !appointment?.isServiceTimeDependent,
      consultationDate: appointment?.appointmentDate,
      type: appointment?.isServiceTimeDependent
        ? sanitizedData.type
        : data.type,
    }).then((res) => {
      setIsSubmitting(false)
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
  const isLoading = loading || isSubmitting

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
        <NextDropdown appointment={appointment} />
        {!appointment?.isServiceTimeDependent && (
          <>
            <LocationDropdown appointment={appointment} disabled={isLoading} />
            <VisitMediumDropdown />
            <ProviderDropdown appointment={appointment} disabled={isLoading} />
          </>
        )}

        <CreateFollowUpButton loading={isLoading} onSubmit={onSubmit} />
        <CalenderView
          appointmentDate={appointment?.appointmentDate}
          onVisitAdd={() => {
            fetchQuickNoteAppointment(patientId, appointmentId)
            search({
              patientIds: [Number(patientId)],
              appointmentIds: [Number(appointmentId)],
            })
          }}
          selectedProviderId={form.watch('providerId')}
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
