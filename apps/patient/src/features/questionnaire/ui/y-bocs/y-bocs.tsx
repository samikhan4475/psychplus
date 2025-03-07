'use client'

import { QuestionnaireTable } from '../shared/questionnaire-table'
import { LABELS, QUESTIONS } from './constants'

const Ybocs = () => (
  <QuestionnaireTable labels={LABELS} data={QUESTIONS} showNumbering={false} />
)

export { Ybocs }
