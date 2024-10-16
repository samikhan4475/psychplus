import { GroupSelectSection } from '@/components'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'

const BLOCK_ID = 'skin'

const BLOCK_TITLE = 'Skin'

const SKN_OPTIONS = [
  {
    label: 'Normal',
    value: 'sknNormal',
  },
  {
    label: 'Persistent rash/spots',
    value: 'sknPersistentRashSpots',
  },
  {
    label: 'Acne',
    value: 'sknAcne',
  },
  {
    label: 'Tattoos',
    value: 'sknTattoos',
  },
]
const SkinBlock = ({
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
        ...SKN_OPTIONS,
        {
          label: 'Other',
          value: 'sknOther',
          details: {
            type: 'text',
            label: 'Details',
            field: 'sknOtherDetails',
          },
        },
      ]}
      normalChipsSelected={normalChipsSelected}
      setNormalChipsSelected={setNormalChipsSelected}
    />
  )
}

export { SkinBlock }
