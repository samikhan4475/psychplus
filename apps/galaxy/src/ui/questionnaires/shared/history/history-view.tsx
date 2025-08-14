import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { ListIcon, SignalIcon, XIcon } from 'lucide-react'
import { QuickNoteHistory } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useStore } from '../../store'
import { calculateTotalScore } from '../utils/score-calculator'
import { AddToNotesSaveButton } from './add-to-notes-save-button'
import { ChartView } from './chart-view'
import { SheetView } from './sheet-view'

interface HistoryViewProps {
  questionnaire: QuickNoteSectionName
}

const HistoryView = ({ questionnaire }: HistoryViewProps) => {
  const [data, setData] = useState<QuickNoteHistory[]>([])
  const patientId = useParams().id as string

  const { addedToNotes, histories, handleAddToNotes, loading } = useStore(
    (state) => ({
      histories: state.histories,
      addedToNotes: state.addedToNotes,
      handleAddToNotes: state.handleAddToNotes,
      loading: state.loading,
    }),
  )

  const calculateTotalScoreForHistory = (history: QuickNoteHistory): string => {
    return calculateTotalScore(history.data, questionnaire).toString()
  }

  useEffect(() => {
    const selectedDates = addedToNotes[questionnaire] || []
    const historiesData = histories[questionnaire] || []

    const modifiedData = historiesData.map((history) => {
      const totalScore = calculateTotalScoreForHistory(history)
      if (selectedDates?.includes(history.createdOn)) {
        return { ...history, addToNote: true, totalScore }
      } else {
        return { ...history, addToNote: false, totalScore }
      }
    })
    setData(modifiedData)
  }, [addedToNotes, histories, patientId, questionnaire])

  const handleOnSave = () => {
    handleAddToNotes(data, questionnaire, patientId)
  }

  return (
    <Tabs.Root defaultValue="SheetView" className="flex w-full flex-col">
      <Flex mt="2" justify="between">
        <Tabs.List>
          <Flex direction="row" justify="between">
            <Flex gap="2">
              <TabsTrigger value="SheetView">
                <Flex align="center" gap="2">
                  <ListIcon size={16} />
                  Sheet View
                </Flex>
              </TabsTrigger>
              <TabsTrigger value="DataView">
                <Flex align="center" gap="2">
                  <SignalIcon size={14} />
                  Data View
                </Flex>
              </TabsTrigger>
            </Flex>
          </Flex>
        </Tabs.List>
        <AddToNotesSaveButton onClick={handleOnSave} loading={loading} />
      </Flex>

      {data && (
        <>
          <TabsContent value="SheetView">
            <SheetView data={data} setData={setData} />
          </TabsContent>

          <TabsContent value="DataView">
            <ChartView data={data} questionnaire={questionnaire} />
          </TabsContent>
        </>
      )}
    </Tabs.Root>
  )
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  onClose?: () => void
}

const TabsTrigger = ({ value, children, onClose }: TabsTriggerProps) => (
  <Tabs.Trigger
    value={value}
    className="bg-white rounded-2 border border-accent-6 px-2 py-0.5 text-[12px] text-gray-12 first:border-l data-[state=active]:cursor-default data-[state=active]:border-gray-5 data-[state=active]:bg-accent-4 data-[state=active]:font-[500] data-[state=active]:text-accent-12"
  >
    <Flex align="center" gap="2">
      {children}
      {onClose ? (
        <Flex
          align="center"
          justify="center"
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
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) => {
  return (
    <Tabs.Content className={className} value={value}>
      {children}
    </Tabs.Content>
  )
}

export { HistoryView }
