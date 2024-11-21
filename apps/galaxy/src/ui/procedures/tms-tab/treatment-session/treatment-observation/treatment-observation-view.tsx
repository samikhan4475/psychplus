import { Flex, Text } from '@radix-ui/themes'
import { BlockLabel, FormFieldError, TextAreaInput } from '@/components'
import { QuickNoteHistory } from '@/types'
import { HistoryButton } from '@/ui/questionnaires/shared'
import { ViewButton } from '@/ui/questionnaires/shared/view/view-button'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import DateViewBlock from './blocks/date-view-block'
import PhqScoreBlock from './blocks/phq-score-block'

const Badge = ({ text }: { text: string }) => {
  return (
    <Flex
      className="bg-pp-green-100 border-pp-green-2 rounded-5 border border-solid"
      align="center"
      pl="2"
      pr="2"
    >
      <Text className="text-pp-green-1 text-1 font-regular">{text}</Text>
    </Flex>
  )
}

const TreatmentObservation = ({ data }: { data: QuickNoteHistory[] }) => {
  const hasData = data.length > 0

  return (
    <Flex direction="column" gap="1">
      <Flex align={'center'} gap={'2'}>
        <BlockLabel required className="text-2 font-[600]">
          Treatment Observation & Patient Response
        </BlockLabel>
        <FormFieldError name="treatmentAndObservation" />
      </Flex>

      <TextAreaInput
        field="treatmentAndObservation"
        className="h- h-16 w-[50%]"
      />

      <Flex
        direction="row"
        className="border-pp-grey rounded-2 border border-solid align-middle"
        p="1"
        justify="between"
      >
        <Flex direction="row" align="center" gap="2">
          <Text className="text-pp-black-3 text-1 font-[600]">
            {`Today's PHQ-9`}
          </Text>
          {hasData ? (
            <>
              <PhqScoreBlock data={data[0].data} />
              <Badge text="Completed" />
              <DateViewBlock date={data[0].createdOn} />
            </>
          ) : null}
        </Flex>
        {hasData && (
          <Flex direction="row" align="center" gap="2">
            <HistoryButton
              questionnaire={QuickNoteSectionName.QuickNoteSectionPhq9}
            />
            <ViewButton
              data={hasData ? data[0].data : []}
              quickNoteSectionName={QuickNoteSectionName.QuickNoteSectionPhq9}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export { TreatmentObservation }
