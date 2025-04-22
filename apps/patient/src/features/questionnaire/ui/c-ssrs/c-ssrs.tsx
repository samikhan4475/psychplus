'use client'

import { QuestionnaireTable } from '../shared/questionnaire-table'
import { LABELS, QUESTIONS } from './constants'

const Cssrs = () => (
  <QuestionnaireTable labels={LABELS} data={QUESTIONS} externalNumbering />
)

export { Cssrs }
