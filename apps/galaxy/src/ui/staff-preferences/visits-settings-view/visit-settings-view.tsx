import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { AddOthersSettingBody } from '@/types'
import { visitTypesSchema, VisitTypesSchemaType } from '../schema'
import { StaffPreferencesHeader } from '../staff-preferences-header/staff-preferences-header'
import { useStore } from '../store'
import { transformVisitTypesDataForBulkAddUpdate } from '../transform'
import { ApprovalType } from '../types'
import { getInitialValues } from '../utils'
import { VisitSettingsTable } from './visit-settings-table'

interface StaffPreferencesVisitSettingsViewProps {
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

const StaffPreferencesVisitSettingsView = ({
  userId,
  onApprove,
  onSave,
}: StaffPreferencesVisitSettingsViewProps) => {
  const {
    dashboardStatus,
    isVisitSettingsPendingStatus,
    setIsPendingStatus,
    mappedPreferences,
    visitTypes,
  } = useStore((state) => ({
    dashboardStatus: state.dashboardStatus,
    isVisitSettingsPendingStatus: state.isVisitSettingsPendingStatus,
    setIsPendingStatus: state.setIsPendingStatus,
    mappedPreferences: state.mappedPreferences,
    visitTypes: state.visitTypes,
  }))

  const form = useForm<VisitTypesSchemaType>({
    resolver: zodResolver(visitTypesSchema),
    reValidateMode: 'onSubmit',
    defaultValues: getInitialValues(mappedPreferences, visitTypes),
  })

  useEffect(() => {
    const subscription = form.watch(() => {
      setIsPendingStatus('isVisitSettingsPendingStatus', true)
    })
    return () => subscription.unsubscribe()
  }, [])

  const onSubmit: SubmitHandler<VisitTypesSchemaType> = async (data) => {
    if (!userId) return
    const { dataToAdd, dataToUpdate } = transformVisitTypesDataForBulkAddUpdate(
      mappedPreferences,
      data,
      userId,
    )
    onSave({ dataToAdd, dataToUpdate })
  }

  return (
    <FormContainer className="bg-white flex-1" form={form} onSubmit={onSubmit}>
      <StaffPreferencesHeader
        heading="Visit Types"
        isPendingStatus={isVisitSettingsPendingStatus}
        hasUnsavedChanges={
          isVisitSettingsPendingStatus && !dashboardStatus.visit
        }
        userId={userId}
        onApprove={() => onApprove(ApprovalType.visit)}
      />
      <Separator className="bg-pp-bg-accent w-full" />
      <VisitSettingsTable />
    </FormContainer>
  )
}

export { StaffPreferencesVisitSettingsView }
