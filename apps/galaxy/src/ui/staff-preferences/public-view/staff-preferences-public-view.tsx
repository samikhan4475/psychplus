'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Grid, Separator, Text } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { AddOthersSettingBody } from '@/types'
import { publicSchema, PublicSchemaType } from '../schema'
import { StaffPreferencesHeader } from '../staff-preferences-header/staff-preferences-header'
import { useStore } from '../store'
import { transformPublicSettingsForBulkAddUpdate } from '../transform'
import { ApprovalType } from '../types'
import { getInitialValues } from '../utils'
import { DayIsFullDoNotAllowCheckbox } from './day-is-full-do-not-allow-checkbox'
import { DayIsFullDoNotShowCheckbox } from './day-is-full-do-not-show-checkbox'
import { MinutesLeftDoNotAllowRadio } from './minutes-left-do-not-allow-radio'
import { MinutesLeftDoNotShowRadio } from './minutes-left-do-not-show-radio'

interface StaffPreferencesPublicViewProps {
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

const StaffPreferencesPublicView = ({
  isAdminView,
  userId,
  onApprove,
  onSave,
}: StaffPreferencesPublicViewProps) => {
  const {
    dashboardStatus,
    isPublicPendingStatus,
    mappedPreferences,
    setIsPendingStatus,
    visitTypes,
  } = useStore((state) => ({
    dashboardStatus: state.dashboardStatus,
    isPublicPendingStatus: state.isPublicPendingStatus,
    mappedPreferences: state.mappedPreferences,
    setIsPendingStatus: state.setIsPendingStatus,
    visitTypes: state.visitTypes,
  }))
  const form = useForm<PublicSchemaType>({
    resolver: zodResolver(publicSchema),
    reValidateMode: 'onSubmit',
    defaultValues: getInitialValues(mappedPreferences, visitTypes),
  })
  useEffect(() => {
    const subscription = form.watch(() => {
      setIsPendingStatus('isPublicPendingStatus', true)
    })
    return () => subscription.unsubscribe()
  }, [])

  const onSubmit: SubmitHandler<PublicSchemaType> = async (data) => {
    if (!userId) return
    const { dataToAdd, dataToUpdate } = transformPublicSettingsForBulkAddUpdate(
      mappedPreferences,
      data,
      userId,
    )
    onSave({ dataToAdd, dataToUpdate })
  }
  return (
    <FormContainer className="bg-white flex-1" form={form} onSubmit={onSubmit}>
      <StaffPreferencesHeader
        heading="Public View"
        isPendingStatus={isPublicPendingStatus}
        hasUnsavedChanges={isPublicPendingStatus && !dashboardStatus.public}
        userId={userId}
        onApprove={() => onApprove(ApprovalType.public)}
      />
      <Separator className="bg-pp-bg-accent w-full" />
      <Flex direction="column">
        <Grid columns="2" gap="2">
          <Box pl="3">
            <Text size="1">
              Once the amount of mins left prior to start of visit, do not show
              on public view
            </Text>
          </Box>
          <Box>
            <MinutesLeftDoNotShowRadio isAdminView={isAdminView} />
          </Box>
        </Grid>
        <Grid columns="2" gap="2" className="bg-pp-bg-table-cell">
          <Box pl="3">
            <Text size="1">
              Once the amount of mins left prior to start of visit, do not allow
              staff to book that day of unless have permission?
            </Text>
          </Box>
          <Box>
            <MinutesLeftDoNotAllowRadio isAdminView={isAdminView} />
          </Box>
        </Grid>
        <Grid columns="2" gap="2">
          <Box pl="3">
            <Text size="1">
              Once the day is full following %, do not show on public view?
            </Text>
          </Box>
          <Box>
            <DayIsFullDoNotShowCheckbox isAdminView={isAdminView} />
          </Box>
        </Grid>
        <Grid columns="2" gap="2" className="bg-pp-bg-table-cell">
          <Box pl="3">
            <Text size="1">
              Once the day is full following %, do not allow staff to book that
              day of unless have permission?
            </Text>
          </Box>
          <Box>
            <DayIsFullDoNotAllowCheckbox isAdminView={isAdminView} />
          </Box>
        </Grid>
      </Flex>
    </FormContainer>
  )
}

export { StaffPreferencesPublicView }
