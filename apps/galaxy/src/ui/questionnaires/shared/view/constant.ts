import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import {
  LABELS as AUDITLabels,
  QUESTIONS as AUDITQuestions,
  SCORE_INTERPRETATION_RANGES as AUDITScoreRanges,
} from '../../audit-tab/constants'
import { QuestionnaireTabs } from '../../constants'
import {
  LABELS as DAST10Labels,
  QUESTIONS as DAST10Questions,
  SCORE_INTERPRETATION_RANGES as DAST10ScoreRanges,
} from '../../dast-10-tab/constants'
import {
  LABELS as GAD7Labels,
  QUESTIONS as GAD7Questions,
  SCORE_INTERPRETATION_RANGES as GAD7ScoreRanges,
} from '../../gad-7-tab/constants'
import {
  LABELS as HAMDLabels,
  QUESTIONS as HAMDQuestions,
  SCORE_INTERPRETATION_RANGES as HAMDScoreRanges,
} from '../../ham-d-tab/constants'
import {
  LABELS as PCL5Labels,
  QUESTIONS as PCL5Questions,
  SCORE_INTERPRETATION_RANGES as PCL5ScoreRanges,
} from '../../pcl-5-tab/constants'
import {
  LABELS as PHQ9Labels,
  QUESTIONS as PHQ9Questions,
  SCORE_INTERPRETATION_RANGES as PHQ9ScoreRanges,
} from '../../phq-9-tab/constants'

const questionnaireViewDta = [
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionPhq9,
    labels: PHQ9Labels,
    questions: PHQ9Questions,
    scoreRange: PHQ9ScoreRanges,
    questionnaireTab: QuestionnaireTabs.PHQ_9_TAB,
  },
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionGad7,
    labels: GAD7Labels,
    questions: GAD7Questions,
    scoreRange: GAD7ScoreRanges,
    questionnaireTab: QuestionnaireTabs.GAD_7_TAB,
  },
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionSnapIV,
    questionnaireTab: QuestionnaireTabs.SNAP_IV_TAB,
  },
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionPsc17,
    questionnaireTab: QuestionnaireTabs.PSC_17_TAB,
  },
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionPcl5,
    labels: PCL5Labels,
    questions: PCL5Questions,
    scoreRange: PCL5ScoreRanges,
    questionnaireTab: QuestionnaireTabs.PCL_5_TAB,
  },
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionYbcos,
    questionnaireTab: QuestionnaireTabs.Y_BOCS_TAB,
  },
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionAims,
    questionnaireTab: QuestionnaireTabs.AIMS_TAB,
  },
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionAudit,
    labels: AUDITLabels,
    questions: AUDITQuestions,
    scoreRange: AUDITScoreRanges,
    questionnaireTab: QuestionnaireTabs.AUDIT_TAB,
  },
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionDast10,
    labels: DAST10Labels,
    questions: DAST10Questions,
    scoreRange: DAST10ScoreRanges,
    questionnaireTab: QuestionnaireTabs.DAST_10_TAB,
  },
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionMoca,
    questionnaireTab: QuestionnaireTabs.MOCA_TAB,
  },
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionCssrs,
    questionnaireTab: QuestionnaireTabs.C_SSRS_TAB,
  },
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionHamD,
    labels: HAMDLabels,
    questions: HAMDQuestions,
    scoreRange: HAMDScoreRanges,
    questionnaireTab: QuestionnaireTabs.HAM_D_TAB,
  },
]

export const questionnaireViewConstants = (
  sectionName: QuickNoteSectionName,
) => {
  return (
    questionnaireViewDta.find((data) => data.sectionName === sectionName) ||
    questionnaireViewDta[0]
  )
}
