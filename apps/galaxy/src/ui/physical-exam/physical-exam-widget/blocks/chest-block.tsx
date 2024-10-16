import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'

const BLOCK_ID = 'chest'

const BLOCK_TITLE = 'Chest'

const CHS_OPTIONS = [
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
]

const ChestBlock = ({
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
        ...CHS_OPTIONS,
        {
          label: 'Other',
          value: 'chsOther',
          details: {
            type: 'text',
            label: 'Details',
            field: 'chsOtherDetails',
          },
        },
      ]}
      normalChipsSelected={normalChipsSelected}
      setNormalChipsSelected={setNormalChipsSelected}
    />
  )
}

export { ChestBlock }
