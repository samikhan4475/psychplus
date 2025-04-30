import toast from 'react-hot-toast'
import { QuestionnaireType } from '@/constants'
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

export {
  getQuestionnaireShortNames,
  QuestionnaireQuestionToSectionName,
  sendToPatient,
}
