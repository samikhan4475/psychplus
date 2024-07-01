import { MultiSelectDropdown } from '@psychplus/ui/multi-select-search-dropdown'
import { Box } from '@radix-ui/themes'

const PermissionOptions = [
  {
    label: 'Permission1',
    value: 'Permission1',
  },
  {
    label: 'Permission2',
    value: 'Permission2',
  },
  {
    label: 'Permission3',
    value: 'Permission3',
  },
  {
    label: 'Permission4',
    value: 'Permission4',
  },
]

const PermissionSelector = () => {
  return (
    <Box>
      <MultiSelectDropdown
        options={PermissionOptions}
        buttonClassName='h-7'
        label="Permission to View"
        disabled
      />
    </Box>
  )
}

export { PermissionSelector }
