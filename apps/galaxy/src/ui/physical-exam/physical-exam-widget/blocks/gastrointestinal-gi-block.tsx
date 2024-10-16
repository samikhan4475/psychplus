import { GroupSelectSection } from '@/components'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'

const BLOCK_ID = 'gastrointestinalGi'

const BLOCK_TITLE = 'Gastrointestinal (GI)'

const GI_OPTIONS = [
  {
    label: 'Normal',
    value: 'giNormal',
  },
  {
    label: 'Abdominal pain',
    value: 'giAbdominalPain',
  },
  {
    label: 'Vomiting',
    value: 'giVomiting',
  },
  {
    label: 'Diarrhea/constipation',
    value: 'giDiarrheaConstipation',
  },
  {
    label: 'Jaundice',
    value: 'giJaundice',
  },
  {
    label: 'Food intolerance',
    value: 'giFoodIntolerance',
  },
]

const GastrointestinalGiBlock = ({
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
        ...GI_OPTIONS,
        {
          label: 'Other',
          value: 'giOther',
          details: {
            type: 'text',
            label: 'Details',
            field: 'giOtherDetails',
          },
        },
      ]}
      normalChipsSelected={normalChipsSelected}
      setNormalChipsSelected={setNormalChipsSelected}
    />
  )
}

export { GastrointestinalGiBlock }
