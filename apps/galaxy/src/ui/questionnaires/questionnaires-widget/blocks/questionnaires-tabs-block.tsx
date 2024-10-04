import { QuestionnaireTabs } from '../../constants'
import { QuestionnairesSelectSection } from '../components'

const QuestionnairesTabsBlock = () => {
  return (
    <QuestionnairesSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

const BLOCK_ID = 'questionnairesTabs'

const BLOCK_TITLE = 'Questionnaires'

const BLOCK_OPTIONS = [
  {
    label: QuestionnaireTabs.PHQ_9_TAB,
    value: QuestionnaireTabs.PHQ_9_TAB,
  },
  {
    label: QuestionnaireTabs.GAD_7_TAB,
    value: QuestionnaireTabs.GAD_7_TAB,
  },
  {
    label: QuestionnaireTabs.SNAP_IV_TAB,
    value: QuestionnaireTabs.SNAP_IV_TAB,
  },
  {
    label: QuestionnaireTabs.PCL_5_TAB,
    value: QuestionnaireTabs.PCL_5_TAB,
  },
  {
    label: QuestionnaireTabs.Y_BOCS_TAB,
    value: QuestionnaireTabs.Y_BOCS_TAB,
  },
  {
    label: QuestionnaireTabs.AIMS_TAB,
    value: QuestionnaireTabs.AIMS_TAB,
  },
  {
    label: QuestionnaireTabs.AUDIT_TAB,
    value: QuestionnaireTabs.AUDIT_TAB,
  },
  {
    label: QuestionnaireTabs.DAST_10_TAB,
    value: QuestionnaireTabs.DAST_10_TAB,
  },
  {
    label: QuestionnaireTabs.MOCA_TAB,
    value: QuestionnaireTabs.MOCA_TAB,
  },
  {
    label: QuestionnaireTabs.HAM_D_TAB,
    value: QuestionnaireTabs.HAM_D_TAB,
  },
]

export { QuestionnairesTabsBlock }
