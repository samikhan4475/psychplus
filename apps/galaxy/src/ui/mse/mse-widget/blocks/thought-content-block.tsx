import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  BlockLabel,
  GroupSelectSection,
  TextInput,
  YesNoSelect,
} from '@/components'
import { type MseWidgetSchemaType } from '../mse-widget-schema'

const ThoughtContentBlock = () => {
  const form = useFormContext<MseWidgetSchemaType>()

  return (
    <Flex gap="2">
      <BlockLabel>Thought Content</BlockLabel>
      <Flex align="center" gap="2" wrap="wrap">
        <YesNoSelect label="SI" field="thoughtContentSi" />
        {form.watch('thoughtContentSi') === 'yes' && (
          <GroupSelectSection
            label="SI Active/Passive"
            field="thoughtContentSiActivePassive"
            options={[
              { label: 'Active', value: 'active' },
              { label: 'Passive', value: 'passive' },
            ]}
          />
        )}
        <YesNoSelect label="HI" field="thoughtContentHi" />
        <YesNoSelect label="Delusions" field="thoughtContentDelusions" />
        <YesNoSelect
          label="Hallucinations"
          field="thoughtContentHallucinations"
        />
        <TextInput label="Other" field="thoughtContentOther" />
      </Flex>
    </Flex>
  )
}

export { ThoughtContentBlock }
