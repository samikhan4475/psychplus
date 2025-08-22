import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import {
  LABELS as AUDITLabels,
  QUESTIONS as AUDITQuestions,
  SCORE_INTERPRETATION_RANGES as AUDITScoreRanges,
} from '../../audit-tab/constants'
import {
  BAI_LABELS,
  BAI_QUESTIONS,
  BAI_SCORE_INTERPRETATION_RANGES,
} from '../../bai-tab/constants'
import {
  BDI_QUESTION_LABELS,
  BDI_QUESTIONS,
  BDI_SCORE_INTERPRETATION_RANGES,
} from '../../bdi-tab/constants'
import { QuestionnaireTabs } from '../../constants'
import {
  LABELS as COPSRLabels,
  QUESTIONS as COPSRQuestions,
  SUBSCALES as COPSRSubscales,
} from '../../cops-r-tab/constants'
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
    sectionName: QuickNoteSectionName.QuickNoteSectionCopsR,
    labels: COPSRLabels,
    questions: COPSRQuestions,
    questionnaireTab: QuestionnaireTabs.COPS_R_TAB,
    pagination: {
      enabled: true,
      itemsPerPage: 50,
      interpretation: COPSRSubscales,
    },
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
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionMdq,
    questionnaireTab: QuestionnaireTabs.MDQ_TAB,
  },
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionCars2St,
    questionnaireTab: QuestionnaireTabs.CARS_2_ST_TAB,
  },
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionAdultAsrs,
    questionnaireTab: QuestionnaireTabs.ADULT_ASRS_TAB,
  },
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionVadprs,
    questionnaireTab: QuestionnaireTabs.VADPRS_TAB,
  },
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionGqasc,
    questionnaireTab: QuestionnaireTabs.GQ_ASC_TAB,
  },
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionDesii,
    questionnaireTab: QuestionnaireTabs.DES_II_TAB,
  },
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionBai,
    labels: BAI_LABELS,
    questions: BAI_QUESTIONS,
    scoreRange: BAI_SCORE_INTERPRETATION_RANGES,
    questionnaireTab: QuestionnaireTabs.BAI_TAB,
  },
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionBdi,
    labels: BDI_QUESTION_LABELS,
    questions: BDI_QUESTIONS,
    scoreRange: BDI_SCORE_INTERPRETATION_RANGES,
    questionnaireTab: QuestionnaireTabs.BDI_TAB,
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
