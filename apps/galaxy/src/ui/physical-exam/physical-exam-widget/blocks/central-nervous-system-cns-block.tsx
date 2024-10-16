import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'

const BLOCK_ID = 'centralNervousSystemCns'

const BLOCK_TITLE = 'Central Nervous System (CNS)'

const CNS_OPTIONS = [
  {
    label: 'Normal',
    value: 'cnsNormal',
  },
  {
    label: 'Fainting',
    value: 'cnsFainting',
  },
  {
    label: 'Loss of consciousness (LOC)',
    value: 'cnsLossOfConsciousnessLoc',
  },
  {
    label: 'Weakness',
    value: 'cnsWeakness',
  },
  {
    label: 'Tremor',
    value: 'cnsTremor',
  },
  {
    label: 'Seizures',
    value: 'cnsSeizures',
  },
]

const CentralNervousSystemCnsBlock = ({
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
        ...CNS_OPTIONS,
        {
          label: 'Other',
          value: 'cnsOther',
          details: {
            type: 'text',
            label: 'Details',
            field: 'cnsOtherDetails',
          },
        },
      ]}
      normalChipsSelected={normalChipsSelected}
      setNormalChipsSelected={setNormalChipsSelected}
    />
  )
}

export { CentralNervousSystemCnsBlock }
