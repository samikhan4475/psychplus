import { PatientPharmacy } from '../pharmacy/types'
import { PreCheckinAssessmentTabs } from './constants'
import { PreCheckinAssessmentTab, SharedCode } from './types'

type FilterTabProps = {
  tabs: PreCheckinAssessmentTab[]
  pharmacies: PatientPharmacy[]
  isDawSystemFeatureFlagEnabled?: boolean
}

type FilterCommonProps = {
  tabId: string
  pharmacies: PatientPharmacy[]
  isDawSystemFeatureFlagEnabled?: boolean
}

function mapCodesetToOptions(
  codeset: SharedCode[],
): { label: string; value: string }[] {
  return codeset.map(({ display, ...rest }) => ({
    label: display,
    ...rest,
  }))
}

const filterTabs = ({
  tabs,
  pharmacies,
  isDawSystemFeatureFlagEnabled,
}: FilterTabProps) => {
  return tabs.filter((tab) =>
    shouldIncludeTab({
      tabId: tab.id,
      pharmacies,
      isDawSystemFeatureFlagEnabled,
    }),
  )
}

const shouldIncludeTab = ({
  tabId,
  pharmacies,
  isDawSystemFeatureFlagEnabled,
}: FilterCommonProps) => {
  if (
    tabId === PreCheckinAssessmentTabs.Pharmacy &&
    Array.isArray(pharmacies) &&
    pharmacies.length === 0 &&
    isDawSystemFeatureFlagEnabled
  ) {
    return false
  }
  return true
}

export { filterTabs, shouldIncludeTab, mapCodesetToOptions }
