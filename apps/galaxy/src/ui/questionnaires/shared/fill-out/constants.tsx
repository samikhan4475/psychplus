import {
  LABELS as AUDIT_LABELS,
  QUESTIONS as AUDIT_QUESTIONS,
  SCORE_INTERPRETATION_RANGES as AUDIT_SCORE_INTERPRETATION_RANGES,
} from '@/ui/questionnaires/audit-tab/constants'
import {
  BAI_LABELS,
  BAI_QUESTIONS,
  BAI_SCORE_INTERPRETATION_RANGES,
} from '@/ui/questionnaires/bai-tab/constants'
import {
  BDI_QUESTION_LABELS,
  BDI_QUESTIONS,
  BDI_SCORE_INTERPRETATION_RANGES,
} from '@/ui/questionnaires/bdi-tab/constants'
import {
  SUBSCALES as COPS_SUBSCALES,
  LABELS as COPSR_LABELS,
  QUESTIONS as COPSR_QUESTIONS,
} from '@/ui/questionnaires/cops-r-tab/constants'
import {
  LABELS as DAST_LABELS,
  QUESTIONS as DAST_QUESTIONS,
  SCORE_INTERPRETATION_RANGES as DAST_SCORE_INTERPRETATION_RANGES,
} from '@/ui/questionnaires/dast-10-tab/constants'
import {
  LABELS as GAD7_LABELS,
  QUESTIONS as GAD7_QUESTIONS,
  SCORE_INTERPRETATION_RANGES as GAD7_SCORE_INTERPRETATION_RANGES,
} from '@/ui/questionnaires/gad-7-tab/constants'
import {
  LABELS as HAMD_LABELS,
  QUESTIONS as HAMD_QUESTIONS,
  SCORE_INTERPRETATION_RANGES as HAMD_SCORE_INTERPRETATION_RANGES,
} from '@/ui/questionnaires/ham-d-tab/constants'
import {
  LABELS as PCL5_LABELS,
  QUESTIONS as PCL5_QUESTIONS,
  SCORE_INTERPRETATION_RANGES as PCL5_SCORE_INTERPRETATION_RANGES,
} from '@/ui/questionnaires/pcl-5-tab/constants'
import {
  LABELS as PHQ9_LABELS,
  QUESTIONS as PHQ9_QUESTIONS,
  SCORE_INTERPRETATION_RANGES as PHQ9_SCORE_INTERPRETATION_RANGES,
} from '@/ui/questionnaires/phq-9-tab/constants'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { PaginationConfig, QuestionnairesData } from '../questionnaires-form'
import { ScoreInterpretationRange } from '../score-interpretation'
import { SubscalesConfig } from '../score-interpretation-desired'

export const META_INFO: {
  [key: string]: {
    questions: QuestionnairesData[]
    labels: string[]
    scoreInterpretationRanges: ScoreInterpretationRange[]
    pagination?: PaginationConfig
  }
} = {
  //AUDIT
  [QuickNoteSectionName.QuickNoteSectionAudit]: {
    questions: AUDIT_QUESTIONS,
    labels: AUDIT_LABELS,
    scoreInterpretationRanges: AUDIT_SCORE_INTERPRETATION_RANGES,
  },
  // PCL5
  [QuickNoteSectionName.QuickNoteSectionPcl5]: {
    questions: PCL5_QUESTIONS,
    labels: PCL5_LABELS,
    scoreInterpretationRanges: PCL5_SCORE_INTERPRETATION_RANGES,
  },
  // HAMD
  [QuickNoteSectionName.QuickNoteSectionHamD]: {
    questions: HAMD_QUESTIONS,
    labels: HAMD_LABELS,
    scoreInterpretationRanges: HAMD_SCORE_INTERPRETATION_RANGES,
  },
  // DAST
  [QuickNoteSectionName.QuickNoteSectionDast10]: {
    questions: DAST_QUESTIONS,
    labels: DAST_LABELS,
    scoreInterpretationRanges: DAST_SCORE_INTERPRETATION_RANGES,
  },
  // PHQ9
  [QuickNoteSectionName.QuickNoteSectionPhq9]: {
    questions: PHQ9_QUESTIONS,
    labels: PHQ9_LABELS,
    scoreInterpretationRanges: PHQ9_SCORE_INTERPRETATION_RANGES,
  },
  // GAD7
  [QuickNoteSectionName.QuickNoteSectionGad7]: {
    questions: GAD7_QUESTIONS,
    labels: GAD7_LABELS,
    scoreInterpretationRanges: GAD7_SCORE_INTERPRETATION_RANGES,
  },
  // COPS-R
  [QuickNoteSectionName.QuickNoteSectionCopsR]: {
    questions: COPSR_QUESTIONS,
    labels: COPSR_LABELS,
    scoreInterpretationRanges: [],
    pagination: {
      enabled: true,
      itemsPerPage: 50,
      interpretation: COPS_SUBSCALES as SubscalesConfig,
    },
  },
  // BAI
  [QuickNoteSectionName.QuickNoteSectionBai]: {
    questions: BAI_QUESTIONS,
    labels: BAI_LABELS,
    scoreInterpretationRanges: BAI_SCORE_INTERPRETATION_RANGES,
  },
  // BDI
  [QuickNoteSectionName.QuickNoteSectionBdi]: {
    questions: BDI_QUESTIONS,
    labels: BDI_QUESTION_LABELS,
    scoreInterpretationRanges: BDI_SCORE_INTERPRETATION_RANGES,
  },
}
