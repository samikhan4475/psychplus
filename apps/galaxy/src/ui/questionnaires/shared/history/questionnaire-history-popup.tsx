'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { HistoriesTabs } from './histories-tabs'
import { HistoryView } from './history-view'
import { useStore } from './store'

interface QuestionnairesViewProps {
  questionnaire: QuickNoteSectionName
}

const QuestionnaireHistory = ({ questionnaire }: QuestionnairesViewProps) => {
  const { activeTab, setActiveTab, history, selectedDate, clearTabs } =
    useStore((state) => ({
      activeTab: state.activeTab,
      setActiveTab: state.setActiveTab,
      addTab: state.addTab,
      history: state.history,
      selectedDate: state.selectedDate,
      clearTabs: state.clearTabs,
    }))

  return (
    <Tabs.Root
      className="flex w-full flex-col"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <Flex>
        <Tabs.List>
          <TabsTrigger key={'History'} value={'History'}>
            History
          </TabsTrigger>
          {history.length > 0 && (
            <TabsTrigger value={'View Questionnaires'}>
              View Questionnaires
              <Cross2Icon cursor="pointer" onClick={() => clearTabs()} />
            </TabsTrigger>
          )}
        </Tabs.List>
        <Flex className="flex-1 border-b border-gray-5" />
      </Flex>
      <TabsContent key={'History'} value={'History'}>
        <HistoryView questionnaire={questionnaire} />
      </TabsContent>
      {history.length > 0 && (
        <TabsContent value={'View Questionnaires'}>
          <HistoriesTabs
            data={history}
            sectionName={questionnaire}
            defaultTab={selectedDate}
          />
        </TabsContent>
      )}
    </Tabs.Root>
  )
}

const TabsTrigger = ({
  value,
  children,
  onClose,
}: {
  value: string
  children: React.ReactNode
  onClose?: () => void
}) => (
  <Tabs.Trigger
    value={value}
    className="data-[state=active]:border-b-white data-[state=active]:bg-white border border-l-0 border-accent-6 border-b-gray-5 bg-accent-4 p-0 px-2 py-1 text-[12px] text-gray-12 first:border-l data-[state=active]:cursor-default data-[state=active]:border-gray-5 data-[state=active]:font-[600] data-[state=active]:text-accent-12"
  >
    <Flex align="center" gap="2">
      {children}
      {onClose ? (
        <Flex
          align="center"
          justify="center"
          className="rounded-full hover:text-black h-[18px] w-[18px] cursor-pointer text-gray-11 transition-colors hover:bg-gray-3"
          onPointerDown={(e) => {
            e.preventDefault()
          }}
          onClick={onClose}
        >
          <XIcon width={14} height={14} strokeWidth={1.5} />
        </Flex>
      ) : null}
    </Flex>
  </Tabs.Trigger>
)

const TabsContent = ({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) => {
  const viewedTabs = useStore((state) => state.viewedTabs)
  const isIncluded = viewedTabs.find((tab) => tab.createdOn === value)

  return (
    <Tabs.Content
      value={value}
      forceMount={isIncluded ? true : undefined}
      className="hidden flex-1 flex-col gap-2 overflow-auto data-[state=active]:flex"
    >
      {children}
    </Tabs.Content>
  )
}

export { QuestionnaireHistory }
