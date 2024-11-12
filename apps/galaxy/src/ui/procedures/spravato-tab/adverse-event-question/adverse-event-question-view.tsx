import { Flex, Text } from '@radix-ui/themes'
import { YesNoSelect } from '@/components'
import {
  AdverseEventTextBoxBlock,
  EventResolutionBlock,
  OccurrenceBlock,
  OtherBlock,
} from './blocks'

const AdverseEventQuestionView = () => {
  return (
    <Flex
      direction="column"
      className="border-pp-gray-2 rounded-3 border border-solid"
      p="2"
      gap="2"
    >
      <Text weight="medium" size="2">
        Did the patient experience any serious adverse events during treatment
        or since the last treatment session? This includes event that result in
        patient hospitalization, a disability or permanent damage, death,
        required medical intervention, or was life threatening?
      </Text>
      <YesNoSelect isNoFirst field="adverseEventQuestion" />
      <AdverseEventTextBoxBlock />
      <OccurrenceBlock />
      <OtherBlock />
      <EventResolutionBlock />
    </Flex>
  )
}

export { AdverseEventQuestionView }
