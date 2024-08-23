import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'mania'

const BLOCK_TITLE = 'Mania'

const BLOCK_OPTIONS = [
  {
    label: 'Paranoid Delusion',
    value: 'paranoidDelusion',
  },
  {
    label: 'Auditory Hallucinations',
    value: 'auditoryHallucinations',
  },
  {
    label: 'Disorganized',
    value: 'disorganized',
  },
  {
    label: 'Anhedonia',
    value: 'anhedonia',
  },
  {
    label: 'Avolution',
    value: 'avolution',
  },
  {
    label: 'Catatonia',
    value: 'catatonia',
  },
  {
    label: 'Suicidal Thoughts',
    value: 'suicidalThoughts',
  },
  {
    label: 'Homicidal Thoughts',
    value: 'homicidalThoughts',
  },
]

const SchizophreniaBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { SchizophreniaBlock }
