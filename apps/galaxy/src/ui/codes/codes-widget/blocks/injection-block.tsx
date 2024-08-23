import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'injection'

const BLOCK_TITLE = 'Injection'

const BLOCK_OPTIONS = [
  {
    label: '96372',
    value: '96372',
  },
  {
    label: '96372N',
    value: '96372N',
  },
]

const InjectionBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { InjectionBlock }
