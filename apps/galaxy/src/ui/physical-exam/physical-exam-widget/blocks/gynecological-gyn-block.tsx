import { GroupSelectSection } from '@/components'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'

const BLOCK_ID = 'gynecologicalGyn'

const BLOCK_TITLE = 'Gynecological (GYN)'

const GYN_OPTIONS = [
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
]

const GynecologicalGynBlock = ({
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
        ...GYN_OPTIONS,
        {
          label: 'Other',
          value: 'gynOther',
          details: {
            type: 'text',
            label: 'Details',
            field: 'gynOtherDetails',
          },
        },
      ]}
      normalChipsSelected={normalChipsSelected}
      setNormalChipsSelected={setNormalChipsSelected}
    />
  )
}

export { GynecologicalGynBlock }
