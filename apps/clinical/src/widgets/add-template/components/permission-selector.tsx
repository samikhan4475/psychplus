import { MultiSelectDropdown } from '@psychplus/ui/multi-select-search-dropdown'

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
    <MultiSelectDropdown
      options={PermissionOptions}
      label="Permission to View"
      disabled
    />
  )
}

export { PermissionSelector }
