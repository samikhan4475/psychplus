'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { LoadingPlaceholder } from '@/components'
import { getStaffAction } from '../staff-credentialing/actions'
import { addBulkPreferenceSettings } from './client-actions/add-bulk-preference-settings'
import { updateBulkPreferenceSettings } from './client-actions/update-bulk-preference-settings'
import { SchemaType } from './schema'
import { StaffPreferencesForm } from './staff-preferences-form'
import { useStore } from './store'
import { transformBulkAddUpdate } from './transform'

const StaffPreferencesView = () => {
  const [userId, setUserId] = useState<number>(0)
  const { id } = useParams<{ id: string }>()

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
      const result = await getStaffAction(id)
      if (result.state === 'error') {
        return toast.error(result.error)
      }
      const userId = +result.data.userId
      setUserId(userId)

      await fetchPreferences({ userId })
    })()
  }, [id])

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
          providerId={id}
          onSubmit={onSubmit}
        />
      )}
    </Flex>
  )
}

export { StaffPreferencesView }
