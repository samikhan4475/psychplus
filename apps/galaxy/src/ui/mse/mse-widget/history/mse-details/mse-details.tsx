'use client'

import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import {
  AffectBlock,
  AppearanceBlock,
  BehaviorBlock,
  MemoryBlock,
  MoodBlock,
  OrientationBlock,
  PsychomotorBlock,
  SpeechBlock,
  ThoughtContentBlock,
  ThoughtProcessBlock,
} from '../../blocks'
import { InsightsBlock } from '../../blocks/insights-block'
import { IntelligenceBlock } from '../../blocks/intelligence'
import { JudgementBlock } from '../../blocks/judgment-block'
import { transformIn } from '../../data'
import { useStore } from '../store'

const MseDetails = ({ patientId }: { patientId: string }) => {
  const { selectedRow } = useStore((store) => ({
    selectedRow: store.selectedRow,
  }))

  const result = transformIn(selectedRow?.data)
  if (!selectedRow) {
    return (
      <Flex className="h-full w-full" justify="center" align="center">
        <Text size="2" weight="bold">
          No row selected
        </Text>
      </Flex>
    )
  }
  return (
    <ScrollArea className="h-full w-full pr-2" scrollbars="vertical">
      <Text size="4" weight="bold">
        Physical Exam
      </Text>
      <OrientationBlock result={result} />
      <AppearanceBlock result={result} />
      <BehaviorBlock result={result} />
      <PsychomotorBlock result={result} />
      <SpeechBlock result={result} />
      <MoodBlock result={result} />
      <AffectBlock result={result} />
      <ThoughtProcessBlock result={result} />
      <ThoughtContentBlock result={result} />
      <MemoryBlock result={result} />
      <IntelligenceBlock result={result} />
      <InsightsBlock result={result} />
      <JudgementBlock result={result} />
    </ScrollArea>
  )
}

export { MseDetails }
