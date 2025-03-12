import { NoteSectionName } from '../note/constants'
import { PatientPharmacy } from '../pharmacy/types'
import { PreCheckinAssessmentTabs } from './constants'
import { SharedCode } from './types'

type TabsToShowProps = {
  tabs: string[]
  pharmacies?: PatientPharmacy[]
  isDawSystemFeatureFlagEnabled?: boolean
  questionnaireSectionsToShowOnPreCheckin: NoteSectionName[]
}

type FilterCommonProps = {
  tabId: string
  pharmacies?: PatientPharmacy[]
  isDawSystemFeatureFlagEnabled?: boolean
  questionnaireSectionsToShowOnPreCheckin: NoteSectionName[]
}

function mapCodesetToOptions(
  codeset: SharedCode[],
): { label: string; value: string }[] {
  return codeset.map(({ display, ...rest }) => ({
    label: display,
    ...rest,
  }))
}

const getTabsToShow = ({
  tabs,
  pharmacies,
  isDawSystemFeatureFlagEnabled,
  questionnaireSectionsToShowOnPreCheckin,
}: TabsToShowProps) =>
  tabs.filter((tab) =>
    shouldIncludeTab({
      tabId: tab,
      pharmacies,
      isDawSystemFeatureFlagEnabled,
      questionnaireSectionsToShowOnPreCheckin,
    }),
  )

const shouldIncludeTab = ({
  tabId,
  pharmacies,
  isDawSystemFeatureFlagEnabled,
  questionnaireSectionsToShowOnPreCheckin,
}: FilterCommonProps) => {
  if (
    tabId === PreCheckinAssessmentTabs.Pharmacy &&
    Array.isArray(pharmacies) &&
    pharmacies.length === 0 &&
    isDawSystemFeatureFlagEnabled
  ) {
    return false
  }

  if (
    tabId === PreCheckinAssessmentTabs.Questionnaire &&
    questionnaireSectionsToShowOnPreCheckin?.length === 0
  ) {
    return false
  }

  return true
}

export { getTabsToShow, shouldIncludeTab, mapCodesetToOptions }
