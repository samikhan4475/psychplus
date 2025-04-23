import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { LevelCode, SettingStatusCode } from '@/constants'
import { useStore as globalStore } from '@/store'
import { UserSetting } from '@/types'
import { useProviderId } from '@/ui/schedule/hooks'
import { getPreferenceSettings } from '../client-actions'
import { updateBulkPreferenceSettings } from '../client-actions/update-bulk-preference-settings'
import { transformDataToApprove } from '../transform'

export const usePreferenceApprovalAlert = (isInitialLogin: boolean) => {
  const isProvider = useProviderId()

  const { id: userId } = globalStore((state) => state.user)
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<UserSetting[]>([])

  useEffect(() => {
    if (!isInitialLogin || !isProvider) return
    getPreferenceSettings({
      userId,
      levelCodes: [LevelCode.User],
      categoryValues: ['ProviderDefaults', 'StaffPreference'],
      settingStatusCode: SettingStatusCode.Inactive,
    }).then((res) => {
      if (res.state === 'error') {
        return toast.error(
          res.error || 'Error while fetching Staff Preferences',
        )
      }
      const hasInactive = res.data.some(
        (setting) => setting.settingStatusCode === SettingStatusCode.Inactive,
      )
      if (hasInactive && res.data.length) {
        setIsOpen(true)
        setData(res.data)
      }
    })
  }, [isInitialLogin, isProvider, userId])

  const approvePreferences = async () => {
    const payload = transformDataToApprove(data)
    const res = await updateBulkPreferenceSettings(payload, userId)
    if (res.state === 'error') {
      return toast.error(res.error || 'Error while approving settings ')
    }
    setIsOpen(false)
    setData([])
    toast.success('Preferences approved successfully')
  }

  return {
    isOpen,
    setIsOpen,
    hasUnapprovedSettings: data.length > 0,
    approvePreferences,
  }
}
