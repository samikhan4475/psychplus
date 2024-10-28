import { DetailsType, GroupSelectSection } from '@/components'

const BLOCK_ID = 'substance'

const BLOCK_TITLE = 'Substance'

const BLOCK_OPTIONS = [
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
      label: 'Details',
      field: 'subOtherDetails',
    },
  },
]

const SubstanceBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      parentField="chiefComplaint"
      valueInParent="ccSubstance"
    />
  )
}

export { SubstanceBlock }
