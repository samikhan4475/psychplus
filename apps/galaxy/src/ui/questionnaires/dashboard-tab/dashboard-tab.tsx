'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QUESTIONS } from './constants'
import { DashboardTable } from './dashboard-table'
import { transformIn } from '../shared/data'

const TAB_TITLE = 'Dashboard'

const DashboardTab = ({
  patientId,
  questionnairesDashboardData,
}: {
  patientId: string
  questionnairesDashboardData: QuickNoteSectionItem[]
}) => {
  const totalQuestions = QUESTIONS.length
  
  const initialValue = transformIn(questionnairesDashboardData, totalQuestions)

  return (
    <>
      <TabContentHeading title={TAB_TITLE} />
      <Flex direction="column" py="3" className="bg-white px-2.5 shadow-2">
        <DashboardTable patientId={patientId} data={initialValue} />
      </Flex>
    </>
  )
}

export { DashboardTab }
