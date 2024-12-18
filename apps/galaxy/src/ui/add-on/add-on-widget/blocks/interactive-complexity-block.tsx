import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CheckboxInput } from '@/components'

const INTERACTIVE_COMPLEXITY_BLOCK_OPTIONS = [
  {
    label:
      'The need to manage maladaptive communication (related to, e.g., high anxiety, high reactivity, repeated questions, or disagreement) among participants that complicates delivery of care.',
    field: 'maladaptiveCommunication',
  },
  {
    label:
      'Caregiver emotions or behaviors that interfere with implementation of the treatment plan.',
    field: 'caregiverEmotions',
  },
  {
    label:
      'Evidence or disclosure of a sentinel event and mandated report to a third party (e.g., abuse or neglect with report to state agency) with initiation of discussion of the sentinel event and/or report with patient and other visit participants',
    field: 'sentinelEvent',
  },
  {
    label:
      'Use of play equipment, physical devices, interpreter or translator to overcome barriers to diagnostic or therapeutic interaction with a patient who is not fluent in the same language or who has not developed or lost expressive or receptive language skills to use or understand typical language.',
    field: 'languageBarrier',
  },
]

const InteractiveComplexityBlock = () => {
  const form = useFormContext()

  return (
    <Flex
      direction="column"
      gap="2"
      px="2"
      py="2"
      className="rounded-3 border border-gray-7"
    >
      <Flex align="center" gap="2">
        <CheckboxInput
          field="interactiveComplexity"
          checked={form.watch('interactiveComplexity')}
        />
        <Text className="cursor-default" weight="medium">
          Interactive Complexity in this session
        </Text>
      </Flex>

      {form.watch('interactiveComplexity') && (
        <Flex direction="column" gap="2">
          {INTERACTIVE_COMPLEXITY_BLOCK_OPTIONS.map((option) => (
            <CheckboxInput
              key={option.field}
              label={option.label}
              field={option.field}
              checked={form.watch(`${option.field}`)}
            />
          ))}
        </Flex>
      )}
    </Flex>
  )
}

export { InteractiveComplexityBlock, INTERACTIVE_COMPLEXITY_BLOCK_OPTIONS }
