import { Flex } from '@radix-ui/themes'
import { SelectableChipDetailsProps, SingleSelectChip } from '@/components-v2'

const STANDARD_CONDITIONS: { label: string; field: string }[] = [
  { label: 'Asthma', field: 'asthma' },
  { label: 'COPD', field: 'copd' },
  { label: 'HTN', field: 'htn' },
  { label: 'HLD', field: 'hld' },
  { label: 'DM', field: 'dm' },
  { label: 'Autoimmune', field: 'autoimmune' },
  { label: 'CAD', field: 'cad' },
  { label: 'Stroke', field: 'stroke' },
  { label: 'Migraines', field: 'migraines' },
  { label: 'Head Injury', field: 'headInjury' },
  { label: 'Seizures', field: 'seizures' },
  { label: "Parkinson's", field: 'parkinsons' },
  { label: 'Cirrhosis', field: 'cirrhosis' },
  { label: 'Hepatitis', field: 'hepatitis' },
  { label: 'HIV', field: 'hiv' },
  { label: 'Sleep Apnea', field: 'sleepApnea' },
  { label: 'GERD', field: 'gerd' },
  { label: 'Multiple Sclerosis', field: 'multipleSclerosis' },
  { label: 'Kidney Disease', field: 'kidneyDisease' },
  { label: 'Kidney Stones', field: 'kidneyStones' },
  { label: 'Hypothyroidism', field: 'hypothyroidism' },
  { label: 'Anemia', field: 'anemia' },
  { label: 'Alzheimers', field: 'alzheimers' },
]

const SPECIAL_CONDITIONS: {
  label: string
  field: string
  details: SelectableChipDetailsProps
}[] = [
  {
    label: 'Pregnant',
    field: 'pregnant',
    details: {
      type: 'date',
      label: 'Date of Conception',
      field: 'pregnantDate',
      isRequired: false,
    },
  },
  {
    label: 'Breast Feeding',
    field: 'breastFeeding',
    details: {
      type: 'number',
      label: 'The number of postpartum weeks',
      field: 'breastFeedingDaysPostPartum',
    },
  },
]

const OTHER_CONDITIONS: { label: string; field: string }[] = [
  { label: 'Gonorrhea', field: 'gonorrhea' },
  { label: 'Chlamydia', field: 'chlamydias' },
  { label: 'Measles', field: 'measles' },
  { label: 'Mumps', field: 'mumps' },
  { label: 'Rubella', field: 'rubella' },
  { label: 'Chicken Pox', field: 'chickenPox' },
  { label: 'Syphilis', field: 'syphilis' },
  { label: 'Rash', field: 'rash' },
  { label: 'Glaucoma', field: 'glaucoma' },
  { label: 'Gastric Bypass', field: 'gastricBypass' },
]

const OTHER_OPTION = {
  label: 'Other',
  field: 'other',
  details: { type: 'text', label: '', field: 'otherDetails', maxLength: 500 },
}

const BLOCK_OPTIONS: Array<{
  label: string
  field: string
  details?: SelectableChipDetailsProps
}> = [
  ...STANDARD_CONDITIONS,
  ...SPECIAL_CONDITIONS,
  ...OTHER_CONDITIONS,
  OTHER_OPTION,
]

const ConditionsBlock = () => (
  <Flex gap="2" wrap="wrap">
    {BLOCK_OPTIONS.map(({ field, label, details }) => (
      <SingleSelectChip
        key={field}
        field={field}
        label={label}
        details={details}
      />
    ))}
  </Flex>
)

export { ConditionsBlock, BLOCK_OPTIONS }
