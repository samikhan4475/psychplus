'use client'

import { QuestionnaireTable } from '../shared/questionnaire-table'
import { LABELS, QUESTIONS } from './constants'

const SnapIv = () => <QuestionnaireTable labels={LABELS} data={QUESTIONS} />

export { SnapIv }
