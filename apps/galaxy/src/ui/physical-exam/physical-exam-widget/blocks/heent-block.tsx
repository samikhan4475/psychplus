import { physicalExamWidgetSchema } from '../history/physical-exam-details/data'
import { PhysicalExamGroupDetailSection } from '../history/physical-exam-details/physical-exam-group-detail-section'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'heent'

const BLOCK_TITLE = 'HEENT'

const HNT_OPTIONS: GroupSelectOption<string>[] = [
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
  {
    label: 'Other',
    value: 'hntOther',
    details: {
      type: 'text',
      label: 'Details',
      field: 'hntOtherDetails',
    },
  },
]

const HeentBlock = ({
  normalChipsSelected,
  setNormalChipsSelected,
  isDetails = false,
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
          options={HNT_OPTIONS}
          isTooltip={true}
          result={result}
        />
      ) : (
        <PhysicalExamGroupSelectSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={HNT_OPTIONS}
          isTooltip={true}
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
      )}
    </>
  )
}

export { HeentBlock }
