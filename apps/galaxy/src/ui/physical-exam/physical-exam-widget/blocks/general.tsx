import { GroupSelectSection } from '@/components'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'

const BLOCK_ID = 'general'

const BLOCK_TITLE = 'General'

const GN_OPTIONS = [
  {
    label: 'Normal',
    value: 'gnNormal',
  },
  {
    label: 'Fatigue',
    value: 'gnFatigue',
  },
  {
    label: 'Fever',
    value: 'gnFever',
  },
  {
    label: 'Weight loss',
    value: 'gnWeightLoss',
  },
  {
    label: 'Diaphoresis',
    value: 'gnDiaphoresis',
  },
]

const GeneralBlock = ({
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
        ...GN_OPTIONS,
        {
          label: 'Other',
          value: 'gnOther',
          details: {
            type: 'text',
            label: 'Details',
            field: 'gnOtherDetails',
          },
        },
      ]}
      normalChipsSelected={normalChipsSelected}
      setNormalChipsSelected={setNormalChipsSelected}
    />
  )
}

export { GeneralBlock }
