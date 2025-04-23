'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Grid, Separator } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { AddOthersSettingBody } from '@/types'
import { cosignerInfoSchema, CosignerInfoSchemaType } from '../schema'
import { StaffPreferencesHeader } from '../staff-preferences-header/staff-preferences-header'
import { useStore } from '../store'
import { transformCosignerSettingsForBulkAddUpdate } from '../transform'
import { ApprovalType } from '../types'
import { getInitialValues } from '../utils'
import { CosignerTextField } from './cosigner-text-field'
import { DirectSupervisionRadioButton } from './direct-supervision-radio-button'
import { IndirectSupervisionRadioButton } from './indirect-supervision-radio-button'

interface StaffPreferencesCoSignerInfoViewProps {
  isAdminView: boolean
  userId: number | undefined
  onApprove: (type: ApprovalType) => Promise<string | void>
  onSave: ({ dataToAdd, dataToUpdate, }: {
    dataToAdd: AddOthersSettingBody[]
    dataToUpdate: AddOthersSettingBody[]
  }) => void
}

const StaffPreferencesCoSignerInfoView = ({
  isAdminView,
  userId,
  onApprove,
  onSave,
}: StaffPreferencesCoSignerInfoViewProps) => {
  const {
    dashboardStatus,
    isCosignerInfoPendingStatus,
    mappedPreferences,
    setIsPendingStatus,
    visitTypes,
  } = useStore((state) => ({
    dashboardStatus: state.dashboardStatus,
    isCosignerInfoPendingStatus: state.isCosignerInfoPendingStatus,
    mappedPreferences: state.mappedPreferences,
    setIsPendingStatus: state.setIsPendingStatus,
    visitTypes: state.visitTypes,
  }))
  const form = useForm<CosignerInfoSchemaType>({
    resolver: zodResolver(cosignerInfoSchema),
    reValidateMode: 'onSubmit',
    defaultValues: getInitialValues(mappedPreferences, visitTypes),
  })
  useEffect(() => {
    const subscription = form.watch(() => {
      setIsPendingStatus('isCosignerInfoPendingStatus', true)
    })
    return () => subscription.unsubscribe()
  }, [])
  const onSubmit: SubmitHandler<CosignerInfoSchemaType> = async (data) => {
    if (!userId) return
    const { dataToAdd, dataToUpdate } =
      transformCosignerSettingsForBulkAddUpdate(mappedPreferences, data, userId)
    onSave({ dataToAdd, dataToUpdate })
  }
  return (
    <FormContainer className="bg-white flex-1" form={form} onSubmit={onSubmit}>
      <StaffPreferencesHeader
        heading="CoSigner Info"
        isPendingStatus={isCosignerInfoPendingStatus}
        hasUnsavedChanges={
          isCosignerInfoPendingStatus && !dashboardStatus.cosigner
        }
        userId={userId}
        onApprove={() => onApprove(ApprovalType.cosigner)}
      />
      <Separator className="bg-pp-bg-accent w-full" />
      <Flex gap="2" direction="column" px="3" py="2">
        <Grid columns="5" gap="2">
          <Box className="col-span-4">
            <CosignerTextField
              field="cosignerInfoDirectSupervisionText"
              label="Text"
              isAdminView={isAdminView}
            />
          </Box>
          <Box className="col-span-1 flex items-end">
            <DirectSupervisionRadioButton isAdminView={isAdminView} />
          </Box>
        </Grid>

        <Grid columns="5" gap="2">
          <Box className="col-span-4">
            <CosignerTextField
              field="cosignerInfoInDirectSupervisionText"
              label="Text"
              isAdminView={isAdminView}
            />
          </Box>
          <Box className="col-span-1 flex items-end">
            <IndirectSupervisionRadioButton isAdminView={isAdminView} />
          </Box>
        </Grid>
      </Flex>
    </FormContainer>
  )
}

export { StaffPreferencesCoSignerInfoView }
