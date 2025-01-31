import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CheckboxInput, FormFieldError } from '@/components'
import { INTERACTIVE_COMPLEXITY_BLOCK_OPTIONS } from '../constants'

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
      <FormFieldError name="interactiveComplexity" />
    </Flex>
  )
}

export { InteractiveComplexityBlock }
