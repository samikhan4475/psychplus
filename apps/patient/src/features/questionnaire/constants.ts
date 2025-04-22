import { QUESTIONS as AIMS_QUESTIONS } from '@/features/questionnaire/ui/aims/constants'
import { QUESTIONS as AUDIT_QUESTIONS } from '@/features/questionnaire/ui/audit/constants'
import { QUESTIONS as CSSRS_QUESTIONS } from '@/features/questionnaire/ui/c-ssrs/constants'
import { QUESTIONS as DAST10_QUESTIONS } from '@/features/questionnaire/ui/dast-10/constants'
import { QUESTIONS as GAD7_QUESTIONS } from '@/features/questionnaire/ui/gad-7/constants'
import { QUESTIONS as HAMD_QUESTIONS } from '@/features/questionnaire/ui/ham-d/constants'
import { QUESTIONS as MOCA_QUESTIONS } from '@/features/questionnaire/ui/moca/constants'
import { QUESTIONS as PCL5_QUESTIONS } from '@/features/questionnaire/ui/pcl-5/constants'
import { QUESTIONS as PHQ9_QUESTIONS } from '@/features/questionnaire/ui/phq-9/constants'
import { QUESTIONS as PSC17_QUESTIONS } from '@/features/questionnaire/ui/psc-17/constants'
import { QUESTIONS as SNAPIV_QUESTIONS } from '@/features/questionnaire/ui/snap-iv/constants'
import { QUESTIONS as YBOCS_QUESTIONS } from '@/features/questionnaire/ui/y-bocs/constants'
import { NoteSectionName } from '../note/constants'
import { mocaMapping, questionnaireMapping } from './ui'
import { aimsMapping } from './ui/aims/data'
import { cssrsMapping } from './ui/c-ssrs/data'
import { psc17Mapping } from './ui/psc-17/data'
import { QuestionnaireSchemaType } from './ui/shared/questionnaire-schema'
import { snapIvMapping } from './ui/snap-iv/data'

const TOTAL_QUESTIONS = {
  [NoteSectionName.NoteSectionPhq9]: PHQ9_QUESTIONS.length,
  [NoteSectionName.NoteSectionGad7]: GAD7_QUESTIONS.length,
  [NoteSectionName.NoteSectionSnapIV]: SNAPIV_QUESTIONS.length,
  [NoteSectionName.NoteSectionPcl5]: PCL5_QUESTIONS.length,
  [NoteSectionName.NoteSectionYbocs]: YBOCS_QUESTIONS.length,
  [NoteSectionName.NoteSectionAims]: AIMS_QUESTIONS.length,
  [NoteSectionName.NoteSectionAudit]: AUDIT_QUESTIONS.length,
  [NoteSectionName.NoteSectionDast10]: DAST10_QUESTIONS.length,
  [NoteSectionName.NoteSectionHamD]: HAMD_QUESTIONS.length,
  [NoteSectionName.NoteSectionMoca]: MOCA_QUESTIONS.length,
  [NoteSectionName.NoteSectionCssrs]: CSSRS_QUESTIONS.length,
  [NoteSectionName.NoteSectionPsc17]: PSC17_QUESTIONS.length,
}

const SECTION_QUESTIONS_MAPPING: Partial<
  Record<NoteSectionName, QuestionnaireSchemaType>
> = {
  ...Object.fromEntries(
    Object.entries(TOTAL_QUESTIONS).map(([sectionName, totalQuestions]) => [
      sectionName,
      questionnaireMapping(totalQuestions),
    ]),
  ),
  [NoteSectionName.NoteSectionSnapIV]: snapIvMapping,
  [NoteSectionName.NoteSectionMoca]: mocaMapping,
  [NoteSectionName.NoteSectionAims]: aimsMapping,
  [NoteSectionName.NoteSectionCssrs]: cssrsMapping,
  [NoteSectionName.NoteSectionPsc17]: psc17Mapping,
}

export { SECTION_QUESTIONS_MAPPING, TOTAL_QUESTIONS }
