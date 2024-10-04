import * as Tabs from '@radix-ui/react-tabs'
import { Badge, Flex, Text } from '@radix-ui/themes'
import { ListIcon, SignalIcon } from 'lucide-react'
import { BlockLabel } from '@/components'
import {
  DeleteButton,
  FilloutButton,
  HistoryButton,
  SendReminderButton,
  SendToPatientButton,
  ViewButton,
} from '@/ui/questionnaires/questionnaires-widget'
import { cn } from '@/utils'
import { SCORE_INTERPRETATION_RANGES as AUDIT_SCORE_INTERPRETATION_RANGES } from '../../audit-tab/constants'
import { QuestionnairesStatus, QuestionnaireTabs } from '../../constants'
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
import { QuestionnaireRow } from './questionnaires-select-section'
import { ChartView, ListView, TabsContent, TabsTrigger, useStore } from './tabs'

interface SelectableQuestionnairesChipDetailsProps {
  label: string
  options: QuestionnaireRow[]
}

const SelectableQuestionnairesChipDetails = ({
  label,
  options,
}: SelectableQuestionnairesChipDetailsProps) => {
  const { activeTab, setActiveTab } = useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }))

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
            {label} {options?.length > 1 && ` (${options.length})`}
          </BlockLabel>

          {options.length > 1 ? (
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
              {options.map((option) => {
                return (
                  <QuestionnaireRowDetail
                    option={option}
                    label={label}
                    key={option.date}
                  />
                )
              })}
            </Flex>
          )}
        </Flex>

        <ButtonSection option={options[0]} />
      </Flex>

      {options.length > 1 && (
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="ListView">
            <ListView options={options} label={label} />
          </TabsContent>
          <TabsContent value="DataView">
            <ChartView />
          </TabsContent>
        </Tabs.Root>
      )}
    </Flex>
  )
}

const ButtonSection = ({
  option,
  showHistory = true,
}: {
  option: QuestionnaireRow
  showHistory?: boolean
}) => {
  const status = option?.status || undefined
  const reminderToCompleteQuestionnaireAlreadySent =
    option?.reminderToCompleteQuestionnaireAlreadySent || undefined

  return (
    <Flex gap="3" align="center">
      {status === QuestionnairesStatus.Requested ? (
        <>
          {reminderToCompleteQuestionnaireAlreadySent ? (
            <SendReminderButton />
          ) : (
            <SendToPatientButton />
          )}

          <FilloutButton />
        </>
      ) : null}
      {status !== QuestionnairesStatus.Requested && showHistory && (
        <HistoryButton />
      )}
      {status !== QuestionnairesStatus.Requested && <ViewButton />}
      <DeleteButton />
    </Flex>
  )
}

const QuestionnaireRowDetail = ({
  option,
  label,
}: {
  option: QuestionnaireRow
  label: string
}) => (
  <Flex key={option.date} gap="2" align="center">
    {option.status !== QuestionnairesStatus.Requested && (
      <Badge
        size="1"
        variant="surface"
        color={getBadgeColor(
          getRange(
            scoreInterpretationRanges(label, option.sectionName),
            option.totalScore,
          ),
        )}
      >
        Score {option.totalScore}
      </Badge>
    )}
    <Badge
      variant="surface"
      size="1"
      color={
        option.status === QuestionnairesStatus.Completed ? 'green' : 'yellow'
      }
    >
      {option.status}
    </Badge>

    <Text className="text-[11px]" color="gray" weight="medium">
      ON {option.date || '03/25/2024 09:27:30'}
    </Text>

    {option.filledBy && (
      <Text className="text-[11px]" color="gray" weight="medium">
        BY
      </Text>
    )}
    {option.filledBy && (
      <Badge variant="surface" size="1" color="gray">
        {option.filledBy}
      </Badge>
    )}
  </Flex>
)

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
  SelectableQuestionnairesChipDetails,
  type SelectableQuestionnairesChipDetailsProps,
  QuestionnaireRowDetail,
  ButtonSection,
}
