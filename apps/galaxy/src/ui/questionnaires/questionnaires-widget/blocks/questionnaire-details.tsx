import * as Tabs from '@radix-ui/react-tabs'
import { Badge, Flex, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { ListIcon, SignalIcon } from 'lucide-react'
import { BlockLabel } from '@/components'
import { QuickNoteHistory } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { SCORE_INTERPRETATION_RANGES as AUDIT_SCORE_INTERPRETATION_RANGES } from '../../audit-tab/constants'
import { QuestionnaireTabs } from '../../constants'
import { SCORE_INTERPRETATION_RANGES as DAST10_SCORE_INTERPRETATION_RANGES } from '../../dast-10-tab/constants'
import { SCORE_INTERPRETATION_RANGES as HAMD_SCORE_INTERPRETATION_RANGES } from '../../ham-d-tab/constants'
import { SCORE_INTERPRETATION_RANGES_ORIENTATION } from '../../moca-tab/constants'
import { SCORE_INTERPRETATION_RANGES as PCL5_SCORE_INTERPRETATION_RANGES } from '../../pcl-5-tab/constants'
import { getBadgeColor, getRange, ScoreInterpretationRange } from '../../shared'
import { SCORE_INTERPRETATION_RANGES } from '../../shared/constants'
import {
  SCORE_INTERPRETATION_RANGES_HYPERACTIVITY,
  SCORE_INTERPRETATION_RANGES_INATTENTION,
  SCORE_INTERPRETATION_RANGES_OPPOSITION,
  SNAP_IV_SECTIONS,
} from '../../snap-iv-tab/constants'
import { SCORE_INTERPRETATION_RANGES as YBOCS_SCORE_INTERPRETATION_RANGES } from '../../y-bocs-tab/constants'
import { ChartView, ListView, TabsContent, TabsTrigger } from '../tabs'
import { RowRightButtons } from './row-right-button'
import { useStore } from '../../store'

interface QuestionnairesDetailsProps {
  questionnaire: string
  option: { label: QuestionnaireTabs; value: QuickNoteSectionName }
}

const QuestionnairesDetails = ({
  questionnaire,
  option,
}: QuestionnairesDetailsProps) => {
  const { activeTab, setActiveTab, addedToNotes, histories } = useStore(
    (state) => ({
      activeTab: state.activeTab,
      setActiveTab: state.setActiveTab,
      histories: state.histories,
      addedToNotes: state.addedToNotes,
    }),
  )
  const badgeLabel = option.label

  // get the added to notes dates for the current questionnaire
  const addedTonNotesDates = addedToNotes[questionnaire] || []
  const historiesData = histories[questionnaire] || []  
  
  const filteredHistories = historiesData.filter((history) =>
    addedTonNotesDates.includes(history.createdOn),
  )

  return (
    <Flex className="w-full" direction="column">
      <Flex
        align="center"
        px="2"
        py="1"
        className="border-pp-table-border w-full rounded-1 border"
        justify="between"
      >
        <Flex align="center" gap="2">
          <BlockLabel>
            {option?.label}
            {filteredHistories?.length > 1 && ` (${filteredHistories.length})`}
          </BlockLabel>

          {filteredHistories.length > 1 ? (
            <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
              <Tabs.List className="flex gap-2">
                <TabsTrigger value="ListView">
                  <Flex align="center" gap="2">
                    <ListIcon size="16" />
                    <Text>List View</Text>
                  </Flex>
                </TabsTrigger>
                <TabsTrigger value="DataView">
                  <Flex align="center" gap="2">
                    <SignalIcon size="14" />
                    <Text>Data View</Text>
                  </Flex>
                </TabsTrigger>
              </Tabs.List>
            </Tabs.Root>
          ) : (
            <Flex>
              {filteredHistories.map((option) => {
                return (
                  <QuestionnaireRowDetail
                    option={option}
                    label={badgeLabel}
                    key={option.createdOn}
                  />
                )
              })}
            </Flex>
          )}
        </Flex>

        <RowRightButtons
          questionnaire={questionnaire}
          historiesData={historiesData.length}
        />
      </Flex>

      {filteredHistories.length > 1 && (
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="ListView">
            <ListView options={filteredHistories} label={questionnaire} />
          </TabsContent>
          <TabsContent value="DataView">
            <ChartView />
          </TabsContent>
        </Tabs.Root>
      )}
    </Flex>
  )
}

const QuestionnaireRowDetail = ({
  option,
  label,
}: {
  option: QuickNoteHistory
  label: string
}) => {
  const totalScore = option.data.reduce(
    (acc, item) => acc + Number(item.sectionItemValue),
    0,
  )
  return (
    <Flex key={option.createdOn} gap="2" align="center">
      <Badge
        size="1"
        variant="surface"
        color={getBadgeColor(
          getRange(
            scoreInterpretationRanges(label, option.sectionName),
            totalScore,
          ),
        )}
      >
        Score {totalScore}
      </Badge>

      <Badge variant="surface" size="1" color={'green'}>
        Completed
      </Badge>

      <Text className="text-[11px]" color="gray" weight="medium">
        ON {format(new Date(option.createdOn), 'MM/dd/yyyy HH:mm')}
      </Text>

      {option.createdByRole && (
        <>
          <Text className="text-[11px]" color="gray" weight="medium">
            BY
          </Text>
          <Badge variant="surface" size="1" color="gray">
            {option.createdByRole}
          </Badge>
        </>
      )}
    </Flex>
  )
}

const scoreInterpretationRanges = (
  label: string,
  sectionName?: string,
): ScoreInterpretationRange[] => {
  if (label === QuestionnaireTabs.SNAP_IV_TAB) {
    switch (sectionName) {
      case SNAP_IV_SECTIONS.Inattention:
        return SCORE_INTERPRETATION_RANGES_INATTENTION
      case SNAP_IV_SECTIONS.Opposition:
        return SCORE_INTERPRETATION_RANGES_OPPOSITION
      case SNAP_IV_SECTIONS.Hyperactivity:
        return SCORE_INTERPRETATION_RANGES_HYPERACTIVITY
      default:
        return []
    }
  }

  const rangesMap: { [key: string]: ScoreInterpretationRange[] } = {
    [QuestionnaireTabs.PHQ_9_TAB]: SCORE_INTERPRETATION_RANGES,
    [QuestionnaireTabs.GAD_7_TAB]: SCORE_INTERPRETATION_RANGES,
    [QuestionnaireTabs.PCL_5_TAB]: PCL5_SCORE_INTERPRETATION_RANGES,
    [QuestionnaireTabs.Y_BOCS_TAB]: YBOCS_SCORE_INTERPRETATION_RANGES,
    [QuestionnaireTabs.AIMS_TAB]: [{ color: 'green', min: 0, max: 40 }],
    [QuestionnaireTabs.AUDIT_TAB]: AUDIT_SCORE_INTERPRETATION_RANGES,
    [QuestionnaireTabs.DAST_10_TAB]: DAST10_SCORE_INTERPRETATION_RANGES,
    [QuestionnaireTabs.MOCA_TAB]: SCORE_INTERPRETATION_RANGES_ORIENTATION,
    [QuestionnaireTabs.HAM_D_TAB]: HAMD_SCORE_INTERPRETATION_RANGES,
  }

  return rangesMap[label] || []
}

export {
  QuestionnairesDetails,
  type QuestionnairesDetailsProps,
  QuestionnaireRowDetail,
}
