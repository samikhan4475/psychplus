import { useFormContext } from 'react-hook-form'
import {
  DetailsType,
  GroupSelectOption,
  GroupSelectSection,
} from '@/components'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'

const BLOCK_ID = 'substance'

const BLOCK_TITLE = 'Substance'

const BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  { label: 'Tobacco', value: 'subTobacco' },
  { label: 'Alcohol', value: 'subAlcohol' },
  { label: 'Opioids', value: 'subOpioids' },
  { label: 'Marijuana', value: 'subMarijuana' },
  { label: 'Benzos', value: 'subBenzos' },
  { label: 'Cocaine', value: 'subCocaine' },
  { label: 'Amphetamine', value: 'subAmphetamine' },
  { label: 'PCP', value: 'subPcp' },
  { label: 'Inhalant', value: 'subInhalant' },
  {
    label: 'Other',
    value: 'subOther',
    details: {
      type: 'text' as DetailsType,
      field: 'subOtherDetails',
      maxLength: 500,
    },
  },
]

const SubstanceBlock = () => {
  const form = useFormContext<HpiWidgetSchemaType>()
  const error = form.formState?.errors
  const hasError = error?.hpiOther || error?.chiefComplaint

  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      // parentField="chiefComplaint"
      // valueInParent="ccSubstance"
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
    />
  )
}

export { SubstanceBlock }
