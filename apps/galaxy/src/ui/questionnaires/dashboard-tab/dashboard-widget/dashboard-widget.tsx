import { WidgetContainer } from '@/components'
import { DashboardTable } from './dashboard-table'
import { QuestionnairesDashboard } from './types'

const DashboardWidget = ({
  questionnairesDashboardData,
}: {
  questionnairesDashboardData: QuestionnairesDashboard[]
}) => {
  return (
    <WidgetContainer title="">
      <DashboardTable
        questionnairesDashboardData={questionnairesDashboardData}
      />
    </WidgetContainer>
  )
}

export { DashboardWidget }
