'use client'

import { QuestionnaireTable } from '../shared/questionnaire-table'
import { LABELS, QUESTIONS } from './constants'

const AdultAsrs = () => <QuestionnaireTable labels={LABELS} data={QUESTIONS} />

export { AdultAsrs }
