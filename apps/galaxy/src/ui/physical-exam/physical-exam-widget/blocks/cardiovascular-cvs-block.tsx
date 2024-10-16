import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'

const BLOCK_ID = 'cardiovascularCvs'

const BLOCK_TITLE = 'Cardiovascular (CVS)'

const CVS_OPTIONS = [
  {
    label: 'Normal',
    value: 'cvsNormal',
  },
  {
    label: 'Murmurs',
    value: 'cvsMurmurs',
  },
  {
    label: 'Hypertension (HTN)',
    value: 'cvsHypertensionHtn',
  },
]

const CardiovascularCvsBlock = ({
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
        ...CVS_OPTIONS,
        {
          label: 'Other',
          value: 'cvsOther',
          details: {
            type: 'text',
            label: 'Details',
            field: 'cvsOtherDetails',
          },
        },
      ]}
      normalChipsSelected={normalChipsSelected}
      setNormalChipsSelected={setNormalChipsSelected}
    />
  )
}

export { CardiovascularCvsBlock }
