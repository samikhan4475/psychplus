import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'adhdHyperactive'

const BLOCK_TITLE = 'ADHD Hyperactive'

const BLOCK_OPTIONS = [
  {
    label: 'Fidgeting',
    value: 'adhFidgeting',
  },
  {
    label: 'Leaves Assigned Space',
    value: 'adhLeavesAssignedSpace',
  },
  {
    label: 'Restless',
    value: 'adhRestless',
  },
  {
    label: 'Hard to Enjoy Relaxing',
    value: 'adhHardToEnjoyRelaxing',
  },
  {
    label: 'On the Go',
    value: 'adhOnTheGo',
  },
  {
    label: 'Excessive Talking',
    value: 'adhExcessiveTalking',
  },
  {
    label: 'Blurt Out Answers',
    value: 'adhBlurtsOutAnswers',
  },
  {
    label: 'Impatient',
    value: 'adhImpatient',
  },
  {
    label: 'Interrupts',
    value: 'adhInterrupts',
  },
  {
    label: 'Behavior Outbursts',
    value: 'adhBehaviorOutbursts',
  },
]

const AdhdHyperactiveBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      parentField="chiefComplaint"
      valueInParent="ccAdhdh"
    />
  )
}

export { AdhdHyperactiveBlock }
