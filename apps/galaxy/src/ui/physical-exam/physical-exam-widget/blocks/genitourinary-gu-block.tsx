import { physicalExamWidgetSchema } from '../history/physical-exam-details/data'
import { PhysicalExamGroupDetailSection } from '../history/physical-exam-details/physical-exam-group-detail-section'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'genitourinaryGu'
const BLOCK_TITLE = 'Genitourinary (GU)'

const GU_OPTIONS: GroupSelectOption<string>[] = [
  { label: 'Normal', value: 'guNormal' },
  { label: 'Dysuria', value: 'guDysuria' },
  { label: 'Discharge', value: 'guDischarge' },
  { label: 'Scrotal masses', value: 'guScrotalMasses' },
  { label: 'Urinary frequency', value: 'guUrinaryFrequency' },
  { label: 'Incontinence', value: 'guIncontinence' },
  { label: 'Enuresis', value: 'guEnuresis' },
  {
    label: 'Other',
    value: 'guOther',
    details: {
      type: 'text',
      label: 'Details',
      field: 'guOtherDetails',
    },
  },
]

const GenitourinaryGuBlock = ({
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
          options={GU_OPTIONS}
          result={result}
        />
      ) : (
        <PhysicalExamGroupSelectSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={GU_OPTIONS}
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
      )}
    </>
  )
}

export { GenitourinaryGuBlock }
