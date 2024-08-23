import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'ptsd'

const BLOCK_TITLE = 'PTSD'

const BLOCK_OPTIONS = [
  {
    label: 'Traumatic Event',
    value: 'traumaticEvent',
  },
  {
    label: 'Intrusive Memories',
    value: 'intrusiveMemories',
  },
  {
    label: 'Nightmares',
    value: 'nightmares',
  },
  {
    label: 'Night Terrors',
    value: 'nightTerrors',
  },
  {
    label: 'Flashbacks',
    value: 'flashbacks',
  },
  {
    label: 'Dissociative Episodes',
    value: 'dissociativeEpisodes',
  },
  {
    label: 'Hypervigilance',
    value: 'hypervigilance',
  },
  {
    label: 'Avoidance',
    value: 'avoidance',
  },
  {
    label: 'Startled',
    value: 'startled',
  },
  {
    label: 'Detachment',
    value: 'detachment',
  },
]

const PtsdBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { PtsdBlock }
