import { physicalExamWidgetSchema } from '../history/physical-exam-details/data'
import { PhysicalExamGroupDetailSection } from '../history/physical-exam-details/physical-exam-group-detail-section'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'gynecologicalGyn'

const BLOCK_TITLE = 'Gynecological (GYN)'

const GYN_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Normal',
    value: 'gynNormal',
  },
  {
    label: 'Cycle length',
    value: 'gynCycleLength',
  },
  {
    label: 'Flow',
    value: 'gynFlow',
  },
  {
    label: 'Dysmenorrhea',
    value: 'gynDysmenorrhea',
  },
  {
    label: 'Vaginal discharge',
    value: 'gynVaginalDischarge',
  },
  {
    label: 'Dyspareunia',
    value: 'gynDyspareunia',
  },
  {
    label: 'Other',
    value: 'gynOther',
    details: {
      type: 'text',
      field: 'gynOtherDetails',
    },
  },
]

const GynecologicalGynBlock = ({
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
          options={GYN_OPTIONS}
          result={result}
        />
      ) : (
        <PhysicalExamGroupSelectSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={GYN_OPTIONS}
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
      )}
    </>
  )
}

export { GynecologicalGynBlock }
