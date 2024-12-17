import { physicalExamWidgetSchema } from '../history/physical-exam-details/data'
import { PhysicalExamGroupDetailSection } from '../history/physical-exam-details/physical-exam-group-detail-section'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'psychiatric'

const BLOCK_TITLE = 'Psychiatric'

const PSY_OPTIONS: GroupSelectOption<string>[] = [
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
  {
    label: 'Other',
    value: 'psyOther',
    details: {
      type: 'text',
      field: 'psyOtherDetails',
      maxLength: 30,
    },
  },
]

const PsychiatricBlock = ({
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
          options={PSY_OPTIONS}
          result={result}
        />
      ) : (
        <PhysicalExamGroupSelectSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={PSY_OPTIONS}
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
      )}
    </>
  )
}

export { PsychiatricBlock }
