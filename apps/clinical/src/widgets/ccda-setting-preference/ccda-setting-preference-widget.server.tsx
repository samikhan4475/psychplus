import { unstable_noStore as noStore } from 'next/cache'
import {
  getSystemSettings,
  getUserSettings,
} from '@psychplus/ccda-setting-preference/api.server'
import { CcdaSettingPreferenceWidgetClient } from './ccda-setting-preference-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

const CcdaSettingPreferenceWidgetServer = async () => {
  noStore()

  let user_settings = await getUserSettings()

  if (Array.isArray(user_settings) && user_settings.length === 0) {
    const system_settings_params = {
      isIncludeMetadataResourceChangeControl: false,
      isIncludeMetadataResourceIds: true,
      isIncludeMetadataResourceStatus: true,
      isHierarchicalQuery: true,
      settingStatusCode: 'Active',
      levelCodes: ['System'],
    }
    user_settings = await getSystemSettings(system_settings_params)
  }
  return (
    <>
      <Preloader store={useStore} user_settings={user_settings} />
      <CcdaSettingPreferenceWidgetClient />
    </>
  )
}
export { CcdaSettingPreferenceWidgetServer }
