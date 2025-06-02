import { Flex, Text } from '@radix-ui/themes'
import { BlockLabel, FormFieldContainer, SelectInput } from '@/components'

const RESULT_OPTIONS = [
  {
    label: 'Positive',
    value: 'intPositive',
  },
  {
    label: 'Negative',
    value: 'intNegative',
  },
  {
    label: 'Inconclusive',
    value: 'intInconclusive',
  },
]

const RESULT_ACTION_OPTIONS = [
  {
    label: 'will be',
    value: 'intWillBe',
  },
  {
    label: 'will not be',
    value: 'intWillNotBe',
  },
]

const ResultSelect = () => {
  return <SelectInput field="result" options={RESULT_OPTIONS} required={true} />
}

const ResultActionSelect = () => {
  return <SelectInput field="resultAction" options={RESULT_ACTION_OPTIONS} />
}

const InterpretationBlock = () => {
  return (
    <FormFieldContainer>
      <BlockLabel required className="text-3 font-[600]">
        Interpretation
      </BlockLabel>
      <Flex align="center">
        <Text className="text-[12px]">
          The patient&apos;s urine drug screen results were
        </Text>
        <Text className="mx-1 text-[12px] text-red-9">*</Text>
        <ResultSelect />
        <Text className="mx-1.5 text-[12px]">and</Text>
        <ResultActionSelect />
        <Text className="ml-1.5 text-[12px]">
          forwarded for confirmatory testing via laboratory analysis.
        </Text>
      </Flex>
    </FormFieldContainer>
  )
}

export { InterpretationBlock }
