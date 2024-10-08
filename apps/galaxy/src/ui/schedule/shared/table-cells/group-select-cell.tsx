import { SelectCell } from '@/components'

const options = [
  {
    label: 'Group 1',
    value: 'Group 2',
  },
  {
    label: 'Group 3',
    value: 'Group 3',
  },
  {
    label: 'Group 4',
    value: 'Group 4',
  },
  {
    label: 'Group 5',
    value: 'Group 5',
  },
]

const GroupSelectCell = () => {
  return <SelectCell options={options} />
}

export { GroupSelectCell }
