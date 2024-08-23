import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  BlockLabel,
  GroupSelectSection,
  TextInput,
  YesNoSelect,
} from '@/components'
import { type MseWidgetSchemaType } from '../mse-widget-schema'

const MemoryBlock = () => {
  const form = useFormContext<MseWidgetSchemaType>()

  return (
    <Flex gap="2">
      <BlockLabel>Memory</BlockLabel>
      <Flex align="center" gap="2" wrap="wrap">
        <YesNoSelect label="Recent Intact" field="memoryRecentIntact" />
        <YesNoSelect label="Remote Intact" field="memoryRemoteIntact" />
        <GroupSelectSection
          label="How Tested"
          field="memoryHowTested"
          options={[
            { label: "Yesterday's Events", value: 'yesterdaysEvents' },
            { label: 'Childhood Events', value: 'childhoodEvents' },
            {
              label: 'Other',
              value: 'other',
              details: {
                type: 'text',
                label: 'Details',
                field: 'memoryHowTestedOther',
              },
            },
          ]}
        />
      </Flex>
    </Flex>
  )
}

export { MemoryBlock }
