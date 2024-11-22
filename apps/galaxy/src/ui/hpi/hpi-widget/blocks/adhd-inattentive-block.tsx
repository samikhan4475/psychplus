import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'adhdInattentive'

const BLOCK_TITLE = 'ADHD Inattentive'

const BLOCK_OPTIONS = [
  {
    label: 'Careless Mistakes',
    value: 'adiCarelessMistakes',
  },
  {
    label: 'Decreased Attention',
    value: 'adiDecreasedAttention',
  },
  {
    label: "Doesn't Listen",
    value: 'adiDoesntListen',
  },
  {
    label: 'Hard to Follow Instruction',
    value: 'adiHardToFollowInstruction',
  },
  {
    label: 'Difficulty Organizing',
    value: 'adiDifficultyOrganizing',
  },
  {
    label: 'Difficulty to do Detail Oriented Tasks',
    value: 'adiDifficultyToDoDetailOrientedTasks',
  },
  {
    label: 'Loses Things',
    value: 'adiLosesThings',
  },
  {
    label: 'Easily Distracted',
    value: 'adiEasilyDistracted',
  },
  {
    label: 'Forgetful',
    value: 'adiForgetful',
  },
]

const AdhdInattentiveBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      parentField="chiefComplaint"
      valueInParent="ccAdhdi"
    />
  )
}

export { AdhdInattentiveBlock }
