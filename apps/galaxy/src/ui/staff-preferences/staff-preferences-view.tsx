'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { LoadingPlaceholder } from '@/components'
import { useStore as useGlobalStore } from '@/store'
import { getStaffAction } from '../staff-credentialing/actions'
import { addBulkPreferenceSettings } from './client-actions/add-bulk-preference-settings'
import { updateBulkPreferenceSettings } from './client-actions/update-bulk-preference-settings'
import { SchemaType } from './schema'
import { StaffPreferencesForm } from './staff-preferences-form'
import { useStore } from './store'
import { transformBulkAddUpdate } from './transform'

const StaffPreferencesView = (props: { isProfileView?: boolean }) => {
  const { user } = useGlobalStore((state) => ({ user: state.user }))
  const [userId, setUserId] = useState<number>(user.id)
  const params = useParams<{ id: string }>()
  const staffId = props.isProfileView ? `${user?.staffId}` : params.id

  const { fetchPreferences, loadingPreferences, mappedPreferences } = useStore(
    (state) => ({
      fetchPreferences: state.fetchPreferences,
      loadingPreferences: state.loadingPreferences,
      mappedPreferences: state.mappedPreferences,
      visitTypes: state.visitTypes,
    }),
  )

  useEffect(() => {
    ;(async () => {
      if (props.isProfileView) {
        await fetchPreferences({ userId: user.id })
      } else {
        const result = await getStaffAction(staffId)
        if (result.state === 'error') {
          return toast.error(result.error)
        }
        const userId = +result.data.userId
        setUserId(userId)

        await fetchPreferences({ userId })
      }
    })()
  }, [user.id, staffId])

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const { dataToAdd, dataToUpdate } = transformBulkAddUpdate(
      mappedPreferences,
      data,
      userId,
    )

    const promises = []
    if (dataToAdd.length) {
      promises.push(addBulkPreferenceSettings(dataToAdd, userId))
    }
    if (dataToUpdate.length) {
      promises.push(updateBulkPreferenceSettings(dataToUpdate, userId))
    }

    const result = await Promise.all(promises)

    if (result.every((r) => r.state === 'success')) {
      toast.success('Preferences saved successfully')
      await fetchPreferences({ userId }, true)
    } else {
      const errorMessage = result.find((r) => r.state !== 'success')?.error
      toast.error(errorMessage || 'Error while adding settings')
    }
  }

  return (
    <Flex
      gap="1"
      className="bg-white flex-1 !overflow-hidden"
      direction="column"
    >
      {loadingPreferences ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <StaffPreferencesForm
          userId={userId}
          providerId={staffId}
          onSubmit={onSubmit}
        />
      )}
    </Flex>
  )
}

export { StaffPreferencesView }
