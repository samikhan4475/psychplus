'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Grid, Separator, Text } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { AddOthersSettingBody } from '@/types'
import { alertSchema, AlertSchemaType } from '../schema'
import { StaffPreferencesHeader } from '../staff-preferences-header/staff-preferences-header'
import { useStore } from '../store'
import { transformAlertSettingsForBulkAddUpdate } from '../transform'
import { ApprovalType } from '../types'
import { getInitialValues } from '../utils'
import { AllowDoubleBookingTimeDependentRadio } from './allow-double-booking-time-dependent-radio'
import { MinutesLeftFromPatientRadio } from './minutes-left-from-patient-radio'
import { PatientIsInRoomRadio } from './patient-is-in-room-radio'
import { ShowNeitherOnTherapyTimeDependentVisitsRadio } from './show-neither-on-therapy-time-dependent-visits-radio'

interface StaffPreferencesAlertsViewProps {
  isAdminView: boolean
  userId: number | undefined
  onApprove: (type: ApprovalType) => Promise<string | void>
  onSave: ({
    dataToAdd,
    dataToUpdate,
  }: {
    dataToAdd: AddOthersSettingBody[]
    dataToUpdate: AddOthersSettingBody[]
  }) => void
}

const StaffPreferencesAlertsView = ({
  isAdminView,
  userId,
  onApprove,
  onSave,
}: StaffPreferencesAlertsViewProps) => {
  const {
    dashboardStatus,
    isAlertPendingStatus,
    mappedPreferences,
    setIsPendingStatus,
    visitTypes,
  } = useStore((state) => ({
    dashboardStatus: state.dashboardStatus,
    isAlertPendingStatus: state.isAlertPendingStatus,
    mappedPreferences: state.mappedPreferences,
    setIsPendingStatus: state.setIsPendingStatus,
    visitTypes: state.visitTypes,
  }))
  const form = useForm<AlertSchemaType>({
    resolver: zodResolver(alertSchema),
    reValidateMode: 'onSubmit',
    defaultValues: getInitialValues(mappedPreferences, visitTypes),
  })
  useEffect(() => {
    const subscription = form.watch(() => {
      setIsPendingStatus('isAlertPendingStatus', true)
    })
    return () => subscription.unsubscribe()
  }, [])
  const submitHandler: SubmitHandler<AlertSchemaType> = (data) => {
    if (!userId) return
    const { dataToAdd, dataToUpdate } = transformAlertSettingsForBulkAddUpdate(
      mappedPreferences,
      data,
      userId,
    )
    onSave({ dataToAdd, dataToUpdate })
  }
  return (
    <FormContainer className="bg-white" form={form} onSubmit={submitHandler}>
      <StaffPreferencesHeader
        heading="Alerts"
        isPendingStatus={isAlertPendingStatus}
        hasUnsavedChanges={isAlertPendingStatus && !dashboardStatus.public}
        userId={userId}
        onApprove={() => onApprove(ApprovalType.alert)}
      />
      <Separator className="bg-pp-bg-accent w-full" />

      <Grid columns="3" gap="2" px="3" py="2">
        <Box className="border-pp-gray-2 rounded col-span-2 grid grid-cols-3 border">
          <Box className="border-pp-gray-2 col-span-2 border-b border-r pl-1">
            <Text size="1">When patient is in room</Text>
          </Box>
          <Box className="border-pp-gray-2 col-span-1 flex items-center border-b first:border-b">
            <PatientIsInRoomRadio isAdminView={isAdminView} />
          </Box>
          <Box className="border-pp-gray-2 col-span-2 border-b border-r pl-1">
            <Text size="1">
              When a patient is scheduled for a visit and the visit is less than
              ___ minutes from the scheduled time.
            </Text>
          </Box>
          <Box className="border-pp-gray-2 col-span-1 flex items-center border-b first:border-b">
            <MinutesLeftFromPatientRadio isAdminView={isAdminView} />
          </Box>
          <Box className="border-pp-gray-2 col-span-2 border-b border-r pl-1">
            <Text size="1">
              Show “Neither” on Therapy Add On code section for Time-Dependent
              Visits
            </Text>
          </Box>
          <Box className="border-pp-gray-2 col-span-1 flex items-center border-b first:border-b">
            <ShowNeitherOnTherapyTimeDependentVisitsRadio
              isAdminView={isAdminView}
            />
          </Box>
          <Box className="border-pp-gray-2 col-span-2 border-r pl-1">
            <Text size="1">
              Allow double booking over unconfirmed timed dependent visits
            </Text>
          </Box>
          <Box className="border-pp-gray-2 col-span-1 flex items-center">
            <AllowDoubleBookingTimeDependentRadio isAdminView={isAdminView} />
          </Box>
        </Box>
        <br />
      </Grid>
    </FormContainer>
  )
}

export { StaffPreferencesAlertsView }
