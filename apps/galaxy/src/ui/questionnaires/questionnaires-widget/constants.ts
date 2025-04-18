import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireTabs } from '../constants'

const BLOCK_TITLE = 'Questionnaires'

const BLOCK_OPTIONS = [
  {
    label: QuestionnaireTabs.PHQ_9_TAB,
    value: QuickNoteSectionName.QuickNoteSectionPhq9,
  },
  {
    label: QuestionnaireTabs.GAD_7_TAB,
    value: QuickNoteSectionName.QuickNoteSectionGad7,
  },
  {
    label: QuestionnaireTabs.SNAP_IV_TAB,
    value: QuickNoteSectionName.QuickNoteSectionSnapIV,
  },
  {
    label: QuestionnaireTabs.PCL_5_TAB,
    value: QuickNoteSectionName.QuickNoteSectionPcl5,
  },
  {
    label: QuestionnaireTabs.Y_BOCS_TAB,
    value: QuickNoteSectionName.QuickNoteSectionYbcos,
  },
  {
    label: QuestionnaireTabs.AIMS_TAB,
    value: QuickNoteSectionName.QuickNoteSectionAims,
  },
  {
    label: QuestionnaireTabs.AUDIT_TAB,
    value: QuickNoteSectionName.QuickNoteSectionAudit,
  },
  {
    label: QuestionnaireTabs.DAST_10_TAB,
    value: QuickNoteSectionName.QuickNoteSectionDast10,
  },
  {
    label: QuestionnaireTabs.MOCA_TAB,
    value: QuickNoteSectionName.QuickNoteSectionMoca,
  },
  {
    label: QuestionnaireTabs.HAM_D_TAB,
    value: QuickNoteSectionName.QuickNoteSectionHamD,
  },
  {
    label: QuestionnaireTabs.C_SSRS_TAB,
    value: QuickNoteSectionName.QuickNoteSectionCssrs,
  },
  {
    label: QuestionnaireTabs.PSC_17_TAB,
    value: QuickNoteSectionName.QuickNoteSectionPsc17,
  },
]

export { BLOCK_TITLE, BLOCK_OPTIONS }
