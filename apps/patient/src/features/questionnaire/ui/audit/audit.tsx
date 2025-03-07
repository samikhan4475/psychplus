'use client'

import { QuestionnaireTable } from '../shared/questionnaire-table'
import { LABELS, QUESTIONS } from './constants'

const Audit = () => <QuestionnaireTable labels={LABELS} data={QUESTIONS} />

export { Audit }
