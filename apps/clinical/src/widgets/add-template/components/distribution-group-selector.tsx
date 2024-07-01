import { MultiSelectDropdown } from '@psychplus/ui/multi-select-search-dropdown'
import { Box } from '@radix-ui/themes'

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
    <Box>
      <MultiSelectDropdown
        options={distributionGroupOptions}
        buttonClassName='h-7'
        label="Distribution Group"
        disabled
      />
    </Box>
  )
}

export { DistributionGroupSelector }
