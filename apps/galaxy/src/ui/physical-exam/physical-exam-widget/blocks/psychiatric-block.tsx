import { GroupSelectSection } from '@/components'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'

const BLOCK_ID = 'psychiatric'

const BLOCK_TITLE = 'Psychiatric'

const PSY_OPTIONS = [
  {
    label: 'Normal',
    value: 'psyNormal',
  },
  {
    label: 'Depression',
    value: 'psyDepression',
  },
  {
    label: 'Suicide contemplated/attempted',
    value: 'psySuicideContemplatedAttempted',
  },
  {
    label: 'Hallucinations',
    value: 'psyHallucinations',
  },
  {
    label: 'Previous psychological issues',
    value: 'psyPreviousPsychologicalIssues',
  },
]

const PsychiatricBlock = ({
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
        ...PSY_OPTIONS,
        {
          label: 'Other',
          value: 'psyOther',
          details: {
            type: 'text',
            label: 'Details',
            field: 'psyOtherDetails',
          },
        },
      ]}
      normalChipsSelected={normalChipsSelected}
      setNormalChipsSelected={setNormalChipsSelected}
    />
  )
}

export { PsychiatricBlock }
