import { Flex } from '@radix-ui/themes'
import { BlockLabel, GroupSelectSection, YesNoSelect } from '@/components'
import { ERROR_ID } from '../constants'
import { MseGroupDetailSection } from '../history/mse-details/mse-group-detail-section'
import { type MseWidgetSchemaType } from '../mse-widget-schema'
import { GroupSelectOption } from '../types'

const MEMORY_REMOTE_INTACT_OTHER_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Other',
    value: 'mmOther',
    details: {
      type: 'text',
      field: 'mmOtherDetails',
    },
  },
]

const MEMORY_HOW_TESTED_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  { label: "Yesterday's Events", value: 'mhtYesterdayEvents' },
  { label: 'Childhood Events', value: 'mhtChildhoodEvents' },
  {
    label: 'Other',
    value: 'mhtOther',
    details: {
      type: 'text',
      field: 'mhtOtherDetails',
    },
  },
]

const MemoryBlock = ({ result }: { result?: MseWidgetSchemaType }) => {
  return (
    <Flex gap="2">
      <BlockLabel>Memory</BlockLabel>
      <Flex align="center" gap="2" wrap="wrap">
        <YesNoSelect
          label="Recent Intact"
          field="mmRecentIntactYesNo"
          disabled={!!result}
          defaultValue={
            result ? (result?.['mmRecentIntactYesNo'] as string) : undefined
          }
          resetOnSameValue={true}
          errorField={ERROR_ID}
        />
        <YesNoSelect
          label="Remote Intact"
          field="mmRemoteIntactYesNo"
          disabled={!!result}
          defaultValue={
            result ? (result?.['mmRemoteIntactYesNo'] as string) : undefined
          }
          resetOnSameValue={true}
          errorField={ERROR_ID}
        />

        <>
          {result ? (
            <>
              <MseGroupDetailSection
                field="memoryRemoteIntactOther"
                options={MEMORY_REMOTE_INTACT_OTHER_BLOCK_OPTIONS}
                result={result}
              />
              <MseGroupDetailSection
                label="How Tested"
                field="memoryHowTested"
                options={MEMORY_HOW_TESTED_BLOCK_OPTIONS}
                result={result}
              />
            </>
          ) : (
            <>
              <GroupSelectSection
                field="memoryRemoteIntactOther"
                options={MEMORY_REMOTE_INTACT_OTHER_BLOCK_OPTIONS}
                errorField={ERROR_ID}
              />
              <GroupSelectSection
                label="How Tested"
                field="memoryHowTested"
                options={MEMORY_HOW_TESTED_BLOCK_OPTIONS}
                errorField={ERROR_ID}
              />
            </>
          )}
        </>
      </Flex>
    </Flex>
  )
}

export { MemoryBlock }
