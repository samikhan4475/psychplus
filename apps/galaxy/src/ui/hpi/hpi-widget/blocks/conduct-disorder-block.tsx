import { useFormContext } from 'react-hook-form'
import { GroupSelectSection } from '@/components'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'

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
  const form = useFormContext<HpiWidgetSchemaType>()
  const error = form.formState?.errors

  const hasError = error?.hpiOther || error?.chiefComplaint

  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      parentField="chiefComplaint"
      valueInParent="ccConductDisorder"
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
    />
  )
}

export { ConductDisorderBlock }
