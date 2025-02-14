import { physicalExamWidgetSchema } from '../history/physical-exam-details/data'
import { PhysicalExamGroupDetailSection } from '../history/physical-exam-details/physical-exam-group-detail-section'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'nutrition'

const BLOCK_TITLE = 'Nutrition'

const NUT_OPTIONS: GroupSelectOption<string>[] = [
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
  {
    label: 'Other',
    value: 'nutOther',
    details: {
      type: 'text',
      field: 'nutOtherDetails',
      maxLength: 500,
    },
  },
]

const NutritionBlock = ({
  normalChipsSelected,
  setNormalChipsSelected,
  isDetails,
  result,
}: {
  normalChipsSelected?: string[]
  setNormalChipsSelected?: (selected: string[]) => void
  isDetails?: boolean
  result?: physicalExamWidgetSchema
}) => {
  return (
    <>
      {isDetails ? (
        <PhysicalExamGroupDetailSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={NUT_OPTIONS}
          result={result}
        />
      ) : (
        <PhysicalExamGroupSelectSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={NUT_OPTIONS}
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
      )}
    </>
  )
}

export { NutritionBlock }
