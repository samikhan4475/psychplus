import { TableCellSelect } from './table-cell-select'

const options = [
  {
    label: 'Room 1',
    value: 'Room 1',
  },
  {
    label: 'Room 2',
    value: 'Room 2',
  },
  {
    label: 'Room 3',
    value: 'Room 3',
  },
  {
    label: 'Room 4',
    value: 'Room 4',
  },
]

const RoomSelectCell = () => {
  return <TableCellSelect options={options} />
}

export { RoomSelectCell }
