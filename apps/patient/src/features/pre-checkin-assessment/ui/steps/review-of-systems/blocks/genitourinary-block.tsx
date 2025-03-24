import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DetailsType } from '@/components-v2/selectable-chip-details'
import { useGroupSelection } from '@/hooks/use-group-selection'
import PillBlock from '../../../shared-blocks/pill-block'

const BLOCK_ID = 'genitourinary'

const BLOCK_TITLE = 'Genitourinary'

const GENITOURINARY_BLOCK_OPTIONS = [
  {
    label: 'No concerns',
    value: 'guNoConcerns',
  },
  {
    label: 'Dysmenorrhea',
    value: 'guDysmenorrhea',
  },
  {
    label: 'Urinary frequency',
    value: 'guUrinaryFrequency',
  },
  {
    label: 'Urinary incontinence',
    value: 'guUrinaryIncontinence',
  },
  {
    label: 'Other',
    value: 'guOther',
    details: {
      type: 'text' as DetailsType,
      label: '',
      field: 'guOtherDetails',
    },
  },
]

const GenitourinaryBlock = () => {
  const { watch } = useFormContext()
  const { handleOptionSelect } = useGroupSelection({
    fieldName: BLOCK_ID,
    targetValue: 'guNoConcerns',
  })
  const selected: string[] = watch(BLOCK_ID) || []

  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        {BLOCK_TITLE}
      </Text>
      <Flex gap="3" wrap="wrap">
        {GENITOURINARY_BLOCK_OPTIONS.map((option) => {
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

export { GenitourinaryBlock }
