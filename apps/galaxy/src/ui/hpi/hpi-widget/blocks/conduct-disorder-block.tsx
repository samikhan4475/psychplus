import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'conductDisorder'

const BLOCK_TITLE = 'Conduct Disorder'

const BLOCK_OPTIONS = [
  { label: 'Discipline Issues', value: 'cdDisciplineIssues' },
  { label: 'Defiance', value: 'cdDefiance' },
  { label: 'Argumentative', value: 'cdArgumentative' },
  { label: 'Vengeful', value: 'cdVengeful' },
  { label: 'Deceitful', value: 'cdDeceitful' },
  { label: 'Destructive', value: 'cdDestructive' },
  { label: 'Disproportionate Anger', value: 'cdDisproportionateAnger' },
  { label: 'Animal Cruelty', value: 'cdAnimalCruelty' },
  { label: 'Manipulative', value: 'cdManipulative' },
  { label: 'Sudden Outbursts', value: 'cdSuddenOutbursts' },
]

const ConductDisorderBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      parentField="chiefComplaint"
      valueInParent="ccConductDisorder"
    />
  )
}

export { ConductDisorderBlock }
