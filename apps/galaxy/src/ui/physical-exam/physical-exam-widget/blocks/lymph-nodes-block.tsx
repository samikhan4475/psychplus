import { physicalExamWidgetSchema } from '../history/physical-exam-details/data'
import { PhysicalExamGroupDetailSection } from '../history/physical-exam-details/physical-exam-group-detail-section'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'lymphNodes'

const BLOCK_TITLE = 'Lymph Nodes'

const LN_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Normal',
    value: 'lnNormal',
  },
  {
    label: 'None palpated',
    value: 'lnNonePalpated',
  },
  {
    label: 'Other',
    value: 'lnOther',
    details: {
      type: 'text',
      field: 'lnOtherDetails',
    },
  },
]

const LymphNodesBlock = ({
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
          options={LN_OPTIONS}
          result={result}
        />
      ) : (
        <PhysicalExamGroupSelectSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={LN_OPTIONS}
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
      )}
    </>
  )
}

export { LymphNodesBlock }
