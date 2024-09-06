import { type Row } from '@tanstack/react-table'

interface QuestionnairesDashboard {
  testName: string
  addToPreVisitAssessment: boolean
}

type QuestionnairesDashboardRow = Row<QuestionnairesDashboard>

interface GetQuestionnairesDashboardResponse {
  questionnairesDashboardData: QuestionnairesDashboard[]
}

export type {
  GetQuestionnairesDashboardResponse,
  QuestionnairesDashboard,
  QuestionnairesDashboardRow,
}
