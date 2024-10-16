import { GroupSelectSection } from '@/components'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'

const BLOCK_ID = 'neck'

const BLOCK_TITLE = 'Neck'

const NK_OPTIONS = [
  {
    label: 'Normal',
    value: 'nkNormal',
  },
  {
    label: 'Masses',
    value: 'nkMasses',
  },
]

const NeckBlock = ({
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
        ...NK_OPTIONS,
        {
          label: 'Other',
          value: 'nkOther',
          details: {
            type: 'text',
            label: 'Details',
            field: 'nkOtherDetails',
          },
        },
      ]}
      normalChipsSelected={normalChipsSelected}
      setNormalChipsSelected={setNormalChipsSelected}
    />
  )
}

export { NeckBlock }
