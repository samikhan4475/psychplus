import { GroupSelectSection } from '@/components'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'

const BLOCK_ID = 'genitourinaryGu'
const BLOCK_TITLE = 'Genitourinary (GU)'

const GU_OPTIONS = [
  { label: 'Normal', value: 'guNormal' },
  { label: 'Dysuria', value: 'guDysuria' },
  { label: 'Discharge', value: 'guDischarge' },
  { label: 'Scrotal masses', value: 'guScrotalMasses' },
  { label: 'Urinary frequency', value: 'guUrinaryFrequency' },
  { label: 'Incontinence', value: 'guIncontinence' },
  { label: 'Enuresis', value: 'guEnuresis' },
]

const GenitourinaryGuBlock = ({
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
        ...GU_OPTIONS,
        {
          label: 'Other',
          value: 'guOther',
          details: {
            type: 'text',
            label: 'Details',
            field: 'guOtherDetails',
          },
        },
      ]}
      normalChipsSelected={normalChipsSelected}
      setNormalChipsSelected={setNormalChipsSelected}
    />
  )
}

export { GenitourinaryGuBlock }
