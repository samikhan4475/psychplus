import { SortableContainer } from 'react-sortable-hoc'
import { UserSetting } from '@psychplus/ccda-setting-preference'
import { SortableItem } from '../sortable-item'

const SortableList = SortableContainer<{
  items: UserSetting[]
  setItems: (p: UserSetting[]) => void
}>(
  ({
    items,
    setItems,
  }: {
    items: UserSetting[]
    setItems: (p: UserSetting[]) => void
  }) => {
    return (
      <tbody>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${value.id}`}
            index={index}
            value={value}
            setItems={setItems}
            items={items}
          />
        ))}
      </tbody>
    )
  },
)
export { SortableList }
