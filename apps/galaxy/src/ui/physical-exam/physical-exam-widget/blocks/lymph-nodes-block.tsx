import { GroupSelectSection } from '@/components'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'

const BLOCK_ID = 'lymphNodes'

const BLOCK_TITLE = 'Lymph Nodes'

const LN_OPTIONS = [
  {
    label: 'Normal',
    value: 'lnNormal',
  },
  {
    label: 'None palpated',
    value: 'lnNonePalpated',
  },
]

const LymphNodesBlock = ({
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
        ...LN_OPTIONS,
        {
          label: 'Other',
          value: 'lnOther',
          details: {
            type: 'text',
            label: 'Details',
            field: 'lnOtherDetails',
          },
        },
      ]}
      normalChipsSelected={normalChipsSelected}
      setNormalChipsSelected={setNormalChipsSelected}
    />
  )
}

export { LymphNodesBlock }
