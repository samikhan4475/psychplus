import { physicalExamWidgetSchema } from '../history/physical-exam-details/data'
import { PhysicalExamGroupDetailSection } from '../history/physical-exam-details/physical-exam-group-detail-section'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'gastrointestinalGi'

const BLOCK_TITLE = 'Gastrointestinal (GI)'

const GI_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Normal',
    value: 'giNormal',
  },
  {
    label: 'Abdominal pain',
    value: 'giAbdominalPain',
  },
  {
    label: 'Vomiting',
    value: 'giVomiting',
  },
  {
    label: 'Diarrhea/constipation',
    value: 'giDiarrheaConstipation',
  },
  {
    label: 'Jaundice',
    value: 'giJaundice',
  },
  {
    label: 'Food intolerance',
    value: 'giFoodIntolerance',
  },
  {
    label: 'Other',
    value: 'giOther',
    details: {
      type: 'text',
      field: 'giOtherDetails',
      maxLength: 500,
    },
  },
]

const GastrointestinalGiBlock = ({
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
          options={GI_OPTIONS}
          result={result}
        />
      ) : (
        <PhysicalExamGroupSelectSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={GI_OPTIONS}
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
      )}
    </>
  )
}

export { GastrointestinalGiBlock }
