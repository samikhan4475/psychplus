'use client'

import { QuestionnaireTable } from '../shared/questionnaire-table'
import { LABELS, QUESTIONS } from './constants'

const Aims = () => <QuestionnaireTable labels={LABELS} data={QUESTIONS} />

export { Aims }
