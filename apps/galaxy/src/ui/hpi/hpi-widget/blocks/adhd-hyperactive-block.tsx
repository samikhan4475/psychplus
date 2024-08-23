import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'adhdHyperactive'

const BLOCK_TITLE = 'ADHD Hyperactive'

const BLOCK_OPTIONS = [
  {
    label: 'Fidgeting',
    value: 'fidgeting',
  },
  {
    label: 'Leaves Assigned Space',
    value: 'leavesAssignedSpace',
  },
  {
    label: 'Restless',
    value: 'restless',
  },
  {
    label: 'Hard to Enjoy Relaxing',
    value: 'hardToEnjoyRelaxing',
  },
  {
    label: 'On the Go',
    value: 'onTheGo',
  },
  {
    label: 'Excessive Talking',
    value: 'excessiveTalking',
  },
  {
    label: 'Blurts Out Answers',
    value: 'blurtsOutAnswers',
  },
  {
    label: 'Impatient',
    value: 'impatient',
  },
  {
    label: 'Interrupts',
    value: 'interrupts',
  },
  {
    label: 'Behavior Outbursts',
    value: 'behaviorOutbursts',
  },
]

const AdhdHyperactiveBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { AdhdHyperactiveBlock }
