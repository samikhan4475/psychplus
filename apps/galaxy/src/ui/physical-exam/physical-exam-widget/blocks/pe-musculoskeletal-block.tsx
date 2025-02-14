import { physicalExamWidgetSchema } from '../history/physical-exam-details/data'
import { PhysicalExamGroupDetailSection } from '../history/physical-exam-details/physical-exam-group-detail-section'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'musculoskeletal'

const BLOCK_TITLE = 'Musculoskeletal'

const MSU_OPTIONS: GroupSelectOption<string>[] = [
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
  {
    label: 'Other',
    value: 'msuOther',
    details: {
      type: 'text',
      field: 'msuOtherDetails',
      maxLength: 500,
    },
  },
]

const PeMusculoskeletalBlock = ({
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
          options={MSU_OPTIONS}
          result={result}
        />
      ) : (
        <PhysicalExamGroupSelectSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={MSU_OPTIONS}
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
      )}
    </>
  )
}

export { PeMusculoskeletalBlock }
