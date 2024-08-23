import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'questionnaire'

const BLOCK_TITLE = 'Questionnaire'

const BLOCK_OPTIONS = [
  {
    label: '96127',
    value: '96127',
  },
  {
    label: '96128',
    value: '96128',
  },
]

const QuestionnaireBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { QuestionnaireBlock }
