import { useFormContext } from 'react-hook-form'
import { GroupSelectSection } from '@/components'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'

const BLOCK_ID = 'ptsd'

const BLOCK_TITLE = 'PTSD'

const BLOCK_OPTIONS = [
  { label: 'Traumatic Event', value: 'ptsTraumaticEvent' },
  { label: 'Intrusive Memories', value: 'ptsIntrusiveMemories' },
  { label: 'Nightmares', value: 'ptsNightmares' },
  { label: 'Night Terrors', value: 'ptsNightTerrors' },
  { label: 'Flashbacks', value: 'ptsFlashbacks' },
  { label: 'Dissociative Episodes', value: 'ptsDissociativeEpisodes' },
  { label: 'Hypervigilance', value: 'ptsHypervigilance' },
  { label: 'Avoidance', value: 'ptsAvoidance' },
  { label: 'Startled', value: 'ptsStartled' },
  { label: 'Detachment', value: 'ptsDetachment' },
]

const PtsdBlock = () => {
  const form = useFormContext<HpiWidgetSchemaType>()
  const error = form.formState?.errors
  const hasError = error?.hpiOther || error?.chiefComplaint

  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      // parentField="chiefComplaint"
      valueInParent="ccPtsd"
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
    />
  )
}

export { PtsdBlock }
