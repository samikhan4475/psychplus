import { RadioSelectSection } from '@/components'

const BLOCK_ID = 'professionalEducation'

const BLOCK_TITLE = 'Professional Education'

const BLOCK_OPTIONS = [
  {
    label: 'In School',
    value: 'inSchool',
  },
  {
    label: 'HS/GED',
    value: 'hsGed',
  },
  {
    label: 'College',
    value: 'college',
  },
  {
    label: 'None',
    value: 'none',
  },
]

const EducationBlock = () => {
  return (
    <RadioSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { EducationBlock }
