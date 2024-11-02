import { physicalExamWidgetSchema } from '../history/physical-exam-details/data'
import { PhysicalExamGroupDetailSection } from '../history/physical-exam-details/physical-exam-group-detail-section'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'lungs'

const BLOCK_TITLE = 'Lungs'

const LNG_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Normal',
    value: 'lngNormal',
  },
  {
    label: 'Clear to auscultation bilaterally',
    value: 'lngClearToAuscultationBilaterally',
  },
  {
    label: 'Other',
    value: 'lngOther',
    details: {
      type: 'text',
      field: 'lngOtherDetails',
    },
  },
]

const LungsBlock = ({
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
          options={LNG_OPTIONS}
          result={result}
        />
      ) : (
        <PhysicalExamGroupSelectSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={LNG_OPTIONS}
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
      )}
    </>
  )
}

export { LungsBlock }
