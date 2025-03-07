'use client'

import { QuestionnaireTable } from '../shared/questionnaire-table'
import { LABELS, QUESTIONS } from './constants'

const Dast10 = () => <QuestionnaireTable labels={LABELS} data={QUESTIONS} />

export { Dast10 }
