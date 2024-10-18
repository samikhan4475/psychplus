import { physicalExamWidgetSchema } from '../history/physical-exam-details/data'
import { PhysicalExamGroupDetailSection } from '../history/physical-exam-details/physical-exam-group-detail-section'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'general'

const BLOCK_TITLE = 'General'

const GN_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Normal',
    value: 'gnNormal',
  },
  {
    label: 'Fatigue',
    value: 'gnFatigue',
  },
  {
    label: 'Fever',
    value: 'gnFever',
  },
  {
    label: 'Weight loss',
    value: 'gnWeightLoss',
  },
  {
    label: 'Diaphoresis',
    value: 'gnDiaphoresis',
  },
  {
    label: 'Other',
    value: 'gnOther',
    details: {
      type: 'text',
      label: 'Details',
      field: 'gnOtherDetails',
    },
  },
]

const GeneralBlock = ({
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
          options={GN_OPTIONS}
          result={result}
        />
      ) : (
        <PhysicalExamGroupSelectSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={GN_OPTIONS}
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
      )}
    </>
  )
}

export { GeneralBlock }
