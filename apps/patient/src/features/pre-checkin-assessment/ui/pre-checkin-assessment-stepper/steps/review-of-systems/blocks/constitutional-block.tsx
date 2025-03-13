import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DetailsType } from '@/components-v2/selectable-chip-details'
import { useGroupSelection } from '@/hooks/use-group-selection'
import PillBlock from '../../../shared-blocks/pill-block'

const BLOCK_ID = 'constitutional'
const BLOCK_TITLE = 'Constitutional'

const CONSTITUTIONAL_BLOCK_OPTIONS = [
  { label: 'No concerns', value: 'ctNoConcerns' },
  { label: 'Weight change', value: 'ctWeightChange' },
  { label: 'Fever', value: 'ctFever' },
  { label: 'Chills', value: 'ctChills' },
  { label: 'Fatigue', value: 'ctFatigue' },
  {
    label: 'Other',
    value: 'ctOther',
    details: {
      type: 'text' as DetailsType,
      label: '',
      field: 'ctOtherDetails',
    },
  },
]

const ConstitutionalBlock = () => {
  const { watch } = useFormContext()
  const { handleOptionSelect } = useGroupSelection({
    fieldName: BLOCK_ID,
    targetValue: 'ctNoConcerns',
  })
  const selected: string[] = watch(BLOCK_ID) || []

  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        {BLOCK_TITLE}
      </Text>
      <Flex gap="3" wrap="wrap">
        {CONSTITUTIONAL_BLOCK_OPTIONS.map((option) => {
          const isSelected = selected.includes(option.value)
          return (
            <PillBlock
              key={option.value}
              data={option}
              isSelected={isSelected}
              onToggle={handleOptionSelect}
              formField={BLOCK_ID}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export { ConstitutionalBlock }
