import { GroupSelectSection } from '@/components'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'

const BLOCK_ID = 'musculoskeletal'

const BLOCK_TITLE = 'Nutrition'

const MSU_OPTIONS = [
  {
    label: 'Normal',
    value: 'msuNormal',
  },
  {
    label: 'Scoliosis',
    value: 'msuScoliosis',
  },
  {
    label: 'Joint aches/swelling',
    value: 'msuJointAchesSwelling',
  },
  {
    label: 'Recent trauma',
    value: 'msuRecentTrauma',
  },
  {
    label: 'Limp',
    value: 'msuLimp',
  },
  {
    label: 'Sports injury',
    value: 'msuSportsInjury',
  },
  {
    label: 'Acute Deformity',
    value: 'msuAcuteDeformity',
  },
  {
    label: 'Clubbing/Cyanosis/Edema',
    value: 'msuClubbingCyanosisEdema',
  },
  {
    label: 'Tender',
    value: 'msuTender',
  },
  {
    label: 'ROM restrictions',
    value: 'msuRomRestrictions',
  },
]

const PeMusculoskeletalBlock = ({
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
        ...MSU_OPTIONS,
        {
          label: 'Other',
          value: 'msuOther',
          details: {
            type: 'text',
            label: 'Details',
            field: 'msuOtherDetails',
          },
        },
      ]}
      normalChipsSelected={normalChipsSelected}
      setNormalChipsSelected={setNormalChipsSelected}
    />
  )
}

export { PeMusculoskeletalBlock }
