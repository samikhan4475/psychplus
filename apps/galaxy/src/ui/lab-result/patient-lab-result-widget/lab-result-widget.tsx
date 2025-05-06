'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { TabsContent } from '@radix-ui/react-tabs'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { LabResultFilterForm } from './lab-result-filter-form'
import { LabResultHeader } from './lab-result-header'
import { LabResultSheet } from './lab-result-sheet'
import { LabResultTable } from './lab-result-table'
import { useStore } from './store'

interface LabResultWidgetProps {
  isQuickNoteView?: boolean
  patientId?: string
  appointmentId?: string
}

const LabResultWidget = ({ isQuickNoteView = true }: LabResultWidgetProps) => {
  const [activeTab, setActiveTab] = useState('TableView')
  const patientId = useParams().id as string

  const { fetchLabResults } = useStore((state) => ({
    fetchLabResults: state.fetchLabResults,
  }))

  useEffect(() => {
    fetchLabResults({
      resourceStatusList: ['Active'],
      patientId: patientId,
      isIncludeLabOrder: true,
      isIncludeLabLocation: true,
      isIncludeTests: true,
    })
  }, [])

  return (
    <Flex
      direction="column"
      width="100%"
      className="bg-white  rounded-1 shadow-2"
    >
      <Flex gap="1" direction="column">
        <LabResultHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isQuickNoteView={isQuickNoteView}
        />
        {!isQuickNoteView && <LabResultFilterForm  />}
      </Flex>

      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="TableView">
          {activeTab === 'TableView' && <LabResultTable  isQuickNoteView={isQuickNoteView}/>}
        </TabsContent>
        <TabsContent value="SheetView">
          {activeTab === 'SheetView' && <LabResultSheet />}
        </TabsContent>
      </Tabs.Root>
    </Flex>
  )
}

export { LabResultWidget }
