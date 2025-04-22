'use client'

import { QuestionnaireTable } from '../shared/questionnaire-table'
import { LABELS, QUESTIONS } from './constants'

const Psc17 = () => (
  <QuestionnaireTable labels={LABELS} data={QUESTIONS} externalNumbering />
)

export { Psc17 }
