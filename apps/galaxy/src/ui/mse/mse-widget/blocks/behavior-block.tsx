import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'behavior'

const BLOCK_TITLE = 'Behavior'

const BLOCK_OPTIONS = [
  {
    label: 'Redirectable',
    value: 'redirectable',
  },
  {
    label: 'Uncooperative',
    value: 'uncooperative',
  },
  {
    label: 'Poor eye contact',
    value: 'poorEyeContact',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const BehaviorBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { BehaviorBlock }
