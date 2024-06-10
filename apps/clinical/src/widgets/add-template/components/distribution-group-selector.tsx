import { MultiSelectDropdown } from '@psychplus/ui/multi-select-search-dropdown'

const distributionGroupOptions = [
  {
    label: 'DistributionGroup1',
    value: 'DistributionGroup1',
  },
  {
    label: 'DistributionGroup2',
    value: 'DistributionGroup2',
  },
  {
    label: 'DistributionGroup3',
    value: 'DistributionGroup3',
  },
  {
    label: 'DistributionGroup4',
    value: 'DistributionGroup4',
  },
]

const DistributionGroupSelector = () => {
  return (
    <MultiSelectDropdown
      options={distributionGroupOptions}
      label="Distribution Group"
      disabled
    />
  )
}

export { DistributionGroupSelector }
