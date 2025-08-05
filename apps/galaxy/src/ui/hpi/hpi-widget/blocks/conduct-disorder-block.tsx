import { useFormContext } from 'react-hook-form'
import { DetailsType, GroupSelectSection } from '@/components'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'
import { createBlockOptions } from '../utils'

const BLOCK_ID = 'conductDisorder'

const BLOCK_TITLE = 'Conduct Disorder'

const CD_OPTIONS = createBlockOptions([
  ['Discipline Issues', 'cdDisciplineIssues'],
  ['Defiance', 'cdDefiance'],
  ['Argumentative', 'cdArgumentative'],
  ['Vengeful', 'cdVengeful'],
  ['Deceitful', 'cdDeceitful'],
  ['Destructive', 'cdDestructive'],
  ['Disproportionate Anger', 'cdDisproportionateAnger'],
  ['Animal Cruelty', 'cdAnimalCruelty'],
  ['Manipulative', 'cdManipulative'],
  ['Sudden Outbursts', 'cdSuddenOutbursts'],
  [
    'Other',
    'cdOther',
    {
      type: 'text' as DetailsType,
      field: 'cdOtherDetails',
      maxLength: 500,
    },
  ],
])

const ConductDisorderBlock = ({ disabled = false }: { disabled?: boolean }) => {
  const form = useFormContext<HpiWidgetSchemaType>()
  const error = form.formState?.errors

  const hasError = error?.hpiOther || error?.chiefComplaint

  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={CD_OPTIONS}
      // parentField="chiefComplaint"
      // valueInParent="ccConductDisorder"
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
      disabled={disabled}
    />
  )
}

export { ConductDisorderBlock }
