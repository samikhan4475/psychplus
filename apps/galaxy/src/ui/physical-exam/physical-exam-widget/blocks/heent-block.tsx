import { GroupSelectSection } from '@/components'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'

const BLOCK_ID = 'heent'

const BLOCK_TITLE = 'HEENT'

const HNT_OPTIONS = [
  {
    label: 'Headache',
    value: 'hntHeadache',
  },
  {
    label: 'TMJ Pain',
    value: 'hntTmjPain',
  },
  {
    label: 'Visual/hearing Problems',
    value: 'hntVisualHearingProblems',
  },
  {
    label: 'Rhinitis',
    value: 'hntRhinitis',
  },
  {
    label: 'Sore throat',
    value: 'hntSoreThroat',
  },
  {
    label: 'Frequent nose bleeds',
    value: 'hntFrequentNoseBleeds',
  },
  {
    label: 'No external abnormality',
    value: 'hntNoExternalAbnormality',
  },
  {
    label: 'PERRLA',
    value: 'hntPerrla',
    isTooltip: true,
  },
  {
    label: 'Normal',
    value: 'hntNormal',
  },
  {
    label: 'Nares are patent without drainage',
    value: 'hntNaresArePatentWithoutDrainage',
  },
]

const HeentBlock = ({
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
        ...HNT_OPTIONS,
        {
          label: 'Other',
          value: 'hntOther',
          details: {
            type: 'text',
            label: 'Details',
            field: 'hntOtherDetails',
          },
        },
      ]}
      normalChipsSelected={normalChipsSelected}
      setNormalChipsSelected={setNormalChipsSelected}
      isTooltip={true}
    />
  )
}

export { HeentBlock }
