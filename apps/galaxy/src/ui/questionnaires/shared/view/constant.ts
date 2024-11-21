import { QuickNoteSectionName } from "@/ui/quicknotes/constants"
import { LABELS, SCORE_INTERPRETATION_RANGES } from "../constants"
import { QUESTIONS } from "../../phq-9-tab/constants"
import { QuestionnaireTabs } from "../../constants"
const questionnaireViewDta = [
  {
    sectionName: QuickNoteSectionName.QuickNoteSectionPhq9,
    labels: LABELS,
    questions: QUESTIONS,
    scoreRange: SCORE_INTERPRETATION_RANGES,
    questionnaireTab: QuestionnaireTabs.PHQ_9_TAB
  },
  // add other sections here
]
export const questionnaireViewConstants = (sectionName: QuickNoteSectionName) => {
  return questionnaireViewDta.find((data) => data.sectionName === sectionName) || questionnaireViewDta[0]
}