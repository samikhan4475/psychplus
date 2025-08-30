import toast from 'react-hot-toast'
import { QuestionnaireType } from '@/constants'
import { QuickNoteHistory } from '@/types'
import { capitalizeFirstLetter } from '@/utils'
import { QuickNoteSectionName } from '../quicknotes/constants'
import { sendQuestionnaireToPatientClientAction } from './actions'

function getQuestionnaireShortNames(name: string) {
  let shortName = name.replace('QuicknoteSectionQuestionnaire', '')
  shortName = shortName.replace(/\d+/g, '')
  shortName = shortName.replace(/(I|II|III|IV|V|VI|VII|VIII|IX|X)$/i, '')

  return capitalizeFirstLetter(shortName)
}

const QuestionnaireQuestionToSectionName: Record<string, QuickNoteSectionName> =
  {
    Q1: QuickNoteSectionName.QuickNoteSectionPhq9,
    Q2: QuickNoteSectionName.QuickNoteSectionGad7,
    Q3: QuickNoteSectionName.QuickNoteSectionPcl5,
    Q4: QuickNoteSectionName.QuickNoteSectionSnapIV,
    Q5: QuickNoteSectionName.QuickNoteSectionYbcos,
    Q6: QuickNoteSectionName.QuickNoteSectionAudit,
    Q7: QuickNoteSectionName.QuickNoteSectionAims,
    Q8: QuickNoteSectionName.QuickNoteSectionHamD,
    Q9: QuickNoteSectionName.QuickNoteSectionMoca,
    Q10: QuickNoteSectionName.QuickNoteSectionDast10,
    Q11: QuickNoteSectionName.QuickNoteSectionCssrs,
    Q12: QuickNoteSectionName.QuickNoteSectionPsc17,
    Q13: QuickNoteSectionName.QuickNoteSectionCopsR,
    Q14: QuickNoteSectionName.QuickNoteSectionAdultAsrs,
    Q15: QuickNoteSectionName.QuickNoteSectionVadprs,
    Q16: QuickNoteSectionName.QuickNoteSectionGqasc,
    Q17: QuickNoteSectionName.QuickNoteSectionBai,
    Q18: QuickNoteSectionName.QuickNoteSectionBdi,
    Q19: QuickNoteSectionName.QuickNoteSectionDesii,
    Q20: QuickNoteSectionName.QuickNoteSectionMdq,
    Q21: QuickNoteSectionName.QuickNoteSectionCars2St,
    Q22: QuickNoteSectionName.QuicknoteSectionTograBlue,
  }

const sendToPatient = async (
  patientId: string,
  questionnaireSectionName: QuickNoteSectionName,
) => {
  const response = await sendQuestionnaireToPatientClientAction({
    patientId,
    questionnaireType: getQuestionnaireShortNames(
      questionnaireSectionName,
    ) as QuestionnaireType,
  })

  if (response.state === 'error')
    return toast.error('Failed to send the questionnaire request to patient.')

  toast.success('Questionnaire request sent to patient successfully.')
}

const sumFirstEntryScores = (
  entries: QuickNoteHistory[] = [],
): number | undefined => {
  const firstData = entries[0]?.data
  if (!firstData || firstData.length === 0) return undefined

  return firstData.reduce(
    (total, { sectionItemValue }) => total + (Number(sectionItemValue) || 0),
    0,
  )
}

const parseSectionItemValue = (value: string): number => {
  const specialCases = ['1-contour', '1-hands', '1-numbers']
  const rawValue = String(value)

  const parsed = specialCases.includes(rawValue)
    ? Number(rawValue.split('-')[0])
    : Number(rawValue)

  return isNaN(parsed) ? 0 : parsed
}

export {
  getQuestionnaireShortNames,
  QuestionnaireQuestionToSectionName,
  sendToPatient,
  sumFirstEntryScores,
  parseSectionItemValue,
}
