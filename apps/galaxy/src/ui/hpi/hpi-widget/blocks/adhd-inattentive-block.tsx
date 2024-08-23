import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'adhdInattentive'

const BLOCK_TITLE = 'ADHD Inattentive'

const BLOCK_OPTIONS = [
  {
    label: 'Careless Mistakes',
    value: 'carelessMistakes',
  },
  {
    label: 'Decreased Attention',
    value: 'decreasedAttention',
  },
  {
    label: "Doesn't Listen",
    value: 'doesntListen',
  },
  {
    label: 'Hard to Follow Instruction',
    value: 'hardToFollowInstruction',
  },
  {
    label: 'Difficulty Organizing',
    value: 'difficultyOrganizing',
  },
  {
    label: 'Difficulty to do Detail-Oriented Tasks',
    value: 'difficultyToDoDetailOrientedTasks',
  },
  {
    label: 'Loses Things',
    value: 'losesThings',
  },
  {
    label: 'Easily Distracted',
    value: 'easilyDistracted',
  },
  {
    label: 'Forgetful',
    value: 'forgetful',
  },
]

const AdhdInattentiveBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { AdhdInattentiveBlock }
