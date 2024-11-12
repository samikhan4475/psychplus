import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, GroupSelectSection } from '@/components'
import { SpravatoWidgetSchemaType } from '../../spravato-widget-schema'

const FOLLOW_UP_SCREENING_OPTIONS = [
  {
    label: 'PHQ-9',
    value: 'PHQ-9',
  },
  {
    label: 'PHQ-2',
    value: 'PHQ-2',
  },
  {
    label: 'HAM-D',
    value: 'HAM-D',
  },
  {
    label: 'BDI',
    value: 'BDI',
  },
  {
    label: 'GDS',
    value: 'GDS',
  },
]

const FollowUpScreeningBlock = () => {
  const form = useFormContext<SpravatoWidgetSchemaType>()

  const plan = form.watch('plan')

  return (
    plan.includes('Follow up Assessment Screening') && (
      <Flex
        className="rounded-3 border border-gray-7"
        p="2"
        mt="2"
        gap="2"
        direction="row"
      >
        <BlockLabel className="text-2 font-[600px]">
          Follow up Assessment Screening
        </BlockLabel>
        <GroupSelectSection
          field="followUpScreening"
          options={FOLLOW_UP_SCREENING_OPTIONS}
          label=""
        />
      </Flex>
    )
  )
}

export { FollowUpScreeningBlock }
