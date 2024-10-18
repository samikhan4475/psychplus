import { physicalExamWidgetSchema } from '../history/physical-exam-details/data'
import { PhysicalExamGroupDetailSection } from '../history/physical-exam-details/physical-exam-group-detail-section'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'skin'

const BLOCK_TITLE = 'Skin'

const SKN_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Normal',
    value: 'sknNormal',
  },
  {
    label: 'Persistent rash/spots',
    value: 'sknPersistentRashSpots',
  },
  {
    label: 'Acne',
    value: 'sknAcne',
  },
  {
    label: 'Tattoos',
    value: 'sknTattoos',
  },
  {
    label: 'Other',
    value: 'sknOther',
    details: {
      type: 'text',
      label: 'Details',
      field: 'sknOtherDetails',
    },
  },
]
const SkinBlock = ({
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
          options={SKN_OPTIONS}
          result={result}
        />
      ) : (
        <PhysicalExamGroupSelectSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={SKN_OPTIONS}
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
      )}
    </>
  )
}

export { SkinBlock }
