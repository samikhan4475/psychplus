import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'anxiety'

const BLOCK_TITLE = 'Anxiety'

const BLOCK_OPTIONS = [
  {
    label: 'Feeling Anxious',
    value: 'anxFeelingAnxious',
  },
  {
    label: 'Worrying',
    value: 'anxWorrying',
  },
  {
    label: 'Restless',
    value: 'anxRestless',
  },
  {
    label: 'Fatigue',
    value: 'anxFatigue',
  },
  {
    label: 'Muscle Tension',
    value: 'anxMuscleTension',
  },
  {
    label: 'Irritable',
    value: 'anxIrritable',
  },
  {
    label: 'Social Anxiety',
    value: 'anxSocialAnxiety',
  },
  {
    label: 'Panic Attacks',
    value: 'anxPanicAttacks',
  },
  {
    label: 'Phobia',
    value: 'anxPhobia',
  },
  {
    label: 'Abnormal Fear',
    value: 'anxAbnormalFear',
  },
]

const AnxietyBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { AnxietyBlock }
