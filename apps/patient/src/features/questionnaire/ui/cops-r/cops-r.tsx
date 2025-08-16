'use client'

import { QuestionnaireTable } from '../shared/questionnaire-table'
import { LABELS, QUESTIONS } from './constants'

const CopsR = () => <QuestionnaireTable labels={LABELS} data={QUESTIONS} />

export { CopsR }
