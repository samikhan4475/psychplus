'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { StaffPreferencesAlertsView } from './alerts-view/staff-preferences-alerts-view'
import { updateBulkPreferenceSettings } from './client-actions/update-bulk-preference-settings'
import { StaffPreferencesCoSignerInfoView } from './cosigner-info-view/staff-preferences-cosigner-info-view'
import { StaffPreferencesPublicView } from './public-view/staff-preferences-public-view'
import { schema, SchemaType } from './schema'
import { StaffPreferencesHeader } from './staff-preferences-header/staff-preferences-header'
import { useStore } from './store'
import { transformDataToApprove } from './transform'
import { getInitialValues } from './utils'
import { StaffPreferencesVisitTypesView } from './visits-settings-view/visit-types-table'

const StaffPreferencesForm = ({
  userId,
  providerId,
  onSubmit,
}: {
  userId: number
  providerId: string
  onSubmit: SubmitHandler<SchemaType>
}) => {
  const pathName = usePathname()
  const isAdminView = pathName.includes(`${providerId ?? ''}`)
  const {
    fetchPreferences,
    setIsPendingStatus,
    mappedPreferences,
    visitTypes,
  } = useStore((state) => ({
    fetchPreferences: state.fetchPreferences,
    setIsPendingStatus: state.setIsPendingStatus,
    mappedPreferences: state.mappedPreferences,
    visitTypes: state.visitTypes,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onSubmit',
    defaultValues: getInitialValues(mappedPreferences, visitTypes),
  })

  const onApprove = async () => {
    const dataToUpdate = transformDataToApprove(
      Object.values(mappedPreferences),
    )
    const res = await updateBulkPreferenceSettings(dataToUpdate, userId)
    if (res.state === 'error') {
      return toast.error(res.error || 'Error while approving settings ')
    }
    toast.success('Preferences approved successfully')
    fetchPreferences({ userId })
  }

  useEffect(() => {
    const subscription = form.watch(() => {
      setIsPendingStatus(true)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <FormContainer className="bg-white" form={form} onSubmit={onSubmit}>
      <Flex
        gap="1"
        className="bg-white flex-1 !overflow-hidden"
        direction="column"
      >
        <StaffPreferencesHeader userId={userId} onApprove={onApprove} />
        <StaffPreferencesPublicView isAdminView={isAdminView} />
        <StaffPreferencesAlertsView isAdminView={isAdminView} />
        <StaffPreferencesCoSignerInfoView />
        <StaffPreferencesVisitTypesView />
      </Flex>
    </FormContainer>
  )
}

export { StaffPreferencesForm }
