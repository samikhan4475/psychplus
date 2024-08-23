import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'psychomotor'

const BLOCK_TITLE = 'Psychomotor'

const BLOCK_OPTIONS = [
  {
    label: 'No slowing/agitation',
    value: 'noSlowingAgitation',
  },
  {
    label: 'Slowing',
    value: 'slowing',
  },
  {
    label: 'Agitation',
    value: 'agitation',
  },
  {
    label: 'Catatonic',
    value: 'catatonic',
  },
  {
    label: 'Tremors',
    value: 'tremors',
  },
  {
    label: 'TD',
    value: 'td',
  },
  {
    label: 'Ticks',
    value: 'ticks',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const PsychomotorBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { PsychomotorBlock }
