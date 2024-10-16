import { GroupSelectSection } from '@/components'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'

const BLOCK_ID = 'lungs'

const BLOCK_TITLE = 'Lungs'

const LNG_OPTIONS = [
  {
    label: 'Normal',
    value: 'lngNormal',
  },
  {
    label: 'Clear to auscultation bilaterally',
    value: 'lngClearToAuscultationBilaterally',
  },
]

const LungsBlock = ({
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
        ...LNG_OPTIONS,
        {
          label: 'Other',
          value: 'lngOther',
          details: {
            type: 'text',
            label: 'Details',
            field: 'lngOtherDetails',
          },
        },
      ]}
      normalChipsSelected={normalChipsSelected}
      setNormalChipsSelected={setNormalChipsSelected}
    />
  )
}

export { LungsBlock }
