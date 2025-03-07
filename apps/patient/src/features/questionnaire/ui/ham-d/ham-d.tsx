'use client'

import { QuestionnaireTable } from '../shared/questionnaire-table'
import { LABELS, QUESTIONS } from './constants'

const HamD = () => <QuestionnaireTable labels={LABELS} data={QUESTIONS} />

export { HamD }
