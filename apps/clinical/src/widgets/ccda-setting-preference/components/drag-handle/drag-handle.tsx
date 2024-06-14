import { DragHandleDots2Icon } from '@radix-ui/react-icons'
import { SortableHandle } from 'react-sortable-hoc'

const DragHandle = SortableHandle(() => (
  <DragHandleDots2Icon style={{ cursor: 'grab' }} />
))

export { DragHandle }
