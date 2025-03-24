import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DetailsType } from '@/components-v2/selectable-chip-details'
import { useGroupSelection } from '@/hooks/use-group-selection'
import PillBlock from '../../../shared-blocks/pill-block'

const BLOCK_ID = 'skin'

const BLOCK_TITLE = 'Skin'

const SKIN_BLOCK_OPTIONS = [
  {
    label: 'No concerns',
    value: 'sknNoConcerns',
  },
  {
    label: 'Skin Lesions/Rash',
    value: 'sknSkinLesionsRash',
  },
  {
    label: 'Hair changes',
    value: 'sknHairChanges',
  },
  {
    label: 'Breast changes',
    value: 'sknBreastChanges',
  },
  {
    label: 'Nipple discharge',
    value: 'sknNippleDischarge',
  },
  {
    label: 'Other',
    value: 'sknOther',
    details: {
      type: 'text' as DetailsType,
      label: '',
      field: 'sknOtherDetails',
    },
  },
]

const SkinBlock = () => {
  const { watch } = useFormContext()
  const { handleOptionSelect } = useGroupSelection({
    fieldName: BLOCK_ID,
    targetValue: 'sknNoConcerns',
  })
  const selected: string[] = watch(BLOCK_ID) || []

  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        {BLOCK_TITLE}
      </Text>
      <Flex gap="3" wrap="wrap">
        {SKIN_BLOCK_OPTIONS.map((option) => {
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

export { SkinBlock }
