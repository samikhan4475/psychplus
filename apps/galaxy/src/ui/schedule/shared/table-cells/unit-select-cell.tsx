import { TableCellSelect } from './table-cell-select'

const options = [
  {
    label: 'Unit 1',
    value: 'Unit 1',
  },
  {
    label: 'Unit 2',
    value: 'Unit 2',
  },
  {
    label: 'Unit 3',
    value: 'Unit 3',
  },
  {
    label: 'Unit 4',
    value: 'Unit 4',
  },
]

const UnitSelectCell = () => {
  return <TableCellSelect options={options} />
}

export { UnitSelectCell }
