'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { LoadingPlaceholder } from '@/components'
import { useStore as useGlobalStore } from '@/store'
import { getStaffAction } from '../staff-credentialing/actions'
import { StaffPreferencesForm } from './staff-preferences-form'
import { useStore } from './store'

const StaffPreferencesView = (props: { isProfileView?: boolean }) => {
  const { user } = useGlobalStore((state) => ({ user: state.user }))
  const [userId, setUserId] = useState<number>()
  const params = useParams<{ id: string }>()
  const staffId = props.isProfileView ? `${user?.staffId}` : params.id

  const { fetchPreferences, loadingPreferences } = useStore((state) => ({
    fetchPreferences: state.fetchPreferences,
    loadingPreferences: state.loadingPreferences,
    visitTypes: state.visitTypes,
  }))

  useEffect(() => {
    ;(async () => {
      if (props.isProfileView) {
        setUserId(user.id)
        await fetchPreferences({ userId: user.id })
      } else {
        if (!staffId) return
        const result = await getStaffAction(staffId)
        if (result.state === 'error') {
          toast.error(result.error || 'Failed to fetch staff details')
          return
        }
        const userId = +result.data.userId
        setUserId(userId)

        await fetchPreferences({ userId })
      }
    })()
  }, [user.id, staffId])

  return (
    <Flex
      gap="1"
      className="bg-white flex-1 !overflow-hidden"
      direction="column"
    >
      {loadingPreferences ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <StaffPreferencesForm userId={userId} providerId={staffId} />
      )}
    </Flex>
  )
}

export { StaffPreferencesView }
