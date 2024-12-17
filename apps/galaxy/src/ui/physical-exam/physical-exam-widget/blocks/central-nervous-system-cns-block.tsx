import { physicalExamWidgetSchema } from '../history/physical-exam-details/data'
import { PhysicalExamGroupDetailSection } from '../history/physical-exam-details/physical-exam-group-detail-section'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'centralNervousSystemCns'

const BLOCK_TITLE = 'Central Nervous System (CNS)'

const CNS_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Normal',
    value: 'cnsNormal',
  },
  {
    label: 'Fainting',
    value: 'cnsFainting',
  },
  {
    label: 'Loss of consciousness (LOC)',
    value: 'cnsLossOfConsciousnessLoc',
  },
  {
    label: 'Weakness',
    value: 'cnsWeakness',
  },
  {
    label: 'Tremor',
    value: 'cnsTremor',
  },
  {
    label: 'Seizures',
    value: 'cnsSeizures',
  },
  {
    label: 'Other',
    value: 'cnsOther',
    details: {
      type: 'text',
      field: 'cnsOtherDetails',
      maxLength: 30,
    },
  },
]

const CentralNervousSystemCnsBlock = ({
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
          options={CNS_OPTIONS}
          result={result}
        />
      ) : (
        <PhysicalExamGroupSelectSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={CNS_OPTIONS}
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
      )}
    </>
  )
}

export { CentralNervousSystemCnsBlock }
