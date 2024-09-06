'use client'

import { TabContentHeading } from '@/components'
import { DashboardWidget } from './dashboard-widget'
import { QuestionnairesDashboard } from './dashboard-widget/types'

const TAB_TITLE = 'Dashboard'

const DashboardTab = ({
  questionnairesDashboardData,
}: {
  questionnairesDashboardData: QuestionnairesDashboard[]
}) => {
  return (
    <>
      <TabContentHeading title={TAB_TITLE} />
      <DashboardWidget
        questionnairesDashboardData={questionnairesDashboardData}
      />
    </>
  )
}

export { DashboardTab }
