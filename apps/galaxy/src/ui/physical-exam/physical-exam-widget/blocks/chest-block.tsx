import { physicalExamWidgetSchema } from '../history/physical-exam-details/data'
import { PhysicalExamGroupDetailSection } from '../history/physical-exam-details/physical-exam-group-detail-section'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'chest'

const BLOCK_TITLE = 'Chest'

const CHS_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Normal',
    value: 'chsNormal',
  },
  {
    label: 'Chronic cough',
    value: 'chsChronicCough',
  },
  {
    label: 'Wheezing',
    value: 'chsWheezing',
  },
  {
    label: 'DOE (Dyspnea on exertion)',
    value: 'chsDoeDyspneaOnExertion',
  },
  {
    label: 'Chest pain',
    value: 'chsChestPain',
  },
  {
    label: 'Breast lumps/discharge',
    value: 'chsBreastLumpsDischarge',
  },
  {
    label: 'Other',
    value: 'chsOther',
    details: {
      type: 'text',
      field: 'chsOtherDetails',
      maxLength: 500,
    },
  },
]

const ChestBlock = ({
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
          options={CHS_OPTIONS}
          result={result}
        />
      ) : (
        <PhysicalExamGroupSelectSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={CHS_OPTIONS}
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
      )}
    </>
  )
}

export { ChestBlock }
