import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DetailsType } from '@/components-v2/selectable-chip-details'
import { useGroupSelection } from '@/hooks/use-group-selection'
import PillBlock from '../../../shared-blocks/pill-block'

const BLOCK_ID = 'gastrointestinal'

const BLOCK_TITLE = 'Gastrointestinal'

const GASTROINTESTINAL_BLOCK_OPTIONS = [
  {
    label: 'No concerns',
    value: 'giNoConcerns',
  },
  {
    label: 'Nausea/Vomiting',
    value: 'giNauseaVomiting',
  },
  {
    label: 'Diarrhea',
    value: 'giDiarrhea',
  },
  {
    label: 'Constipation',
    value: 'giConstipation',
  },
  {
    label: 'Other',
    value: 'giOther',
    details: {
      type: 'text' as DetailsType,
      label: '',
      field: 'giOtherDetails',
    },
  },
]

const GastrointestinalBlock = () => {
  const { watch } = useFormContext()
  const { handleOptionSelect } = useGroupSelection({
    fieldName: BLOCK_ID,
    targetValue: 'giNoConcerns',
  })
  const selected: string[] = watch(BLOCK_ID) || []

  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        {BLOCK_TITLE}
      </Text>
      <Flex gap="3" wrap="wrap">
        {GASTROINTESTINAL_BLOCK_OPTIONS.map((option) => {
          const isSelected = selected.includes(option.value)
          return (
            <PillBlock
              key={option.value}
              data={option}
              isSelected={isSelected}
              onToggle={handleOptionSelect}
              fontSize="14px"
              rounded={2}
              fontWeight="light"
              bgColor="pp-gray-5"
              formField={BLOCK_ID}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export { GastrointestinalBlock }
