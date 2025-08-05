import { useFormContext } from 'react-hook-form'
import { DetailsType, GroupSelectSection } from '@/components'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'
import { createBlockOptions } from '../utils'

const BLOCK_ID = 'adhdInattentive'

const BLOCK_TITLE = 'ADHD Inattentive'

const ADHDI_OPTIONS = createBlockOptions([
  ['Careless Mistakes', 'adiCarelessMistakes'],
  ['Decreased Attention', 'adiDecreasedAttention'],
  ["Doesn't Listen", 'adiDoesntListen'],
  ['Hard to Follow Instruction', 'adiHardToFollowInstruction'],
  ['Difficulty Organizing', 'adiDifficultyOrganizing'],
  [
    'Difficulty to do Detail Oriented Tasks',
    'adiDifficultyToDoDetailOrientedTasks',
  ],
  ['Loses Things', 'adiLosesThings'],
  ['Easily Distracted', 'adiEasilyDistracted'],
  ['Forgetful', 'adiForgetful'],
  [
    'Other',
    'adiOther',
    {
      type: 'text' as DetailsType,
      field: 'adiOtherDetails',
      maxLength: 500,
    },
  ],
])

const AdhdInattentiveBlock = ({ disabled = false }: { disabled?: boolean }) => {
  const form = useFormContext<HpiWidgetSchemaType>()
  const error = form.formState?.errors
  const hasError = error?.hpiOther || error?.chiefComplaint

  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={ADHDI_OPTIONS}
      // parentField="chiefComplaint"
      // valueInParent="ccAdhdi"
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
      disabled={disabled}
    />
  )
}

export { AdhdInattentiveBlock }
