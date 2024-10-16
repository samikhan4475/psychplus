import { GroupSelectSection } from '@/components'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'

const BLOCK_ID = 'nutrition'

const BLOCK_TITLE = 'Musculoskeletal'

const NUT_OPTIONS = [
  {
    label: 'Normal',
    value: 'nutNormal',
  },
  {
    label: 'Usual eating habits',
    value: 'nutUsualEatingHabits',
  },
  {
    label: 'Currently dieting',
    value: 'nutCurrentlyDieting',
  },
  {
    label: 'Binges',
    value: 'nutBinges',
  },
  {
    label: 'Diet pills',
    value: 'nutDietPills',
  },
  {
    label: 'Body image',
    value: 'nutBodyImage',
  },
]

const NutritionBlock = ({
  normalChipsSelected,
  setNormalChipsSelected,
}: {
  normalChipsSelected: string[]
  setNormalChipsSelected: (selected: string[]) => void
}) => {
  return (
    <PhysicalExamGroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={[
        ...NUT_OPTIONS,
        {
          label: 'Other',
          value: 'nutOther',
          details: {
            type: 'text',
            label: 'Details',
            field: 'mutOtherDetails',
          },
        },
      ]}
      normalChipsSelected={normalChipsSelected}
      setNormalChipsSelected={setNormalChipsSelected}
    />
  )
}

export { NutritionBlock }
