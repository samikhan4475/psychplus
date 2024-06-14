import { useState } from 'react'
import { Flex, Switch } from '@radix-ui/themes'
import { SortableElement } from 'react-sortable-hoc'
import { UserSetting } from '@psychplus/ccda-setting-preference'
import { DragHandle } from '../drag-handle'
import { split_content } from '../utils'

const SortableItem = SortableElement<{
  value: UserSetting
  setItems: (p: UserSetting[]) => void
  items: UserSetting[]
}>(
  ({
    value,
    setItems,
    items,
  }: {
    value: UserSetting
    setItems: (p: UserSetting[]) => void
    items: UserSetting[]
  }) => {
    const [switchValue, setSwitchValue] = useState(
      !(value.content.split('|')[0] === '00'),
    )
    const updateContent = (content: string, index: number) => {
      return content.split('|')[0] === '00'
        ? index + '0|' + value.content.split('|')[1]
        : '00|' + value.content.split('|')[1]
    }
    const handleSwitchToggle = () => {
      const updatedItems = items.map((item, index) =>
        item.id === value.id
          ? { ...item, content: updateContent(item.content, index + 1) }
          : item,
      )

      setItems(updatedItems)
      setSwitchValue((prevValue) => !prevValue)
    }

    return (
      <tr className="border-gray-200 border-b">
        <td className="border-gray-200 border-l border-r px-4 py-2">
          <Flex align="center" gap="1">
            <DragHandle />
            {split_content(value.content)}
          </Flex>
        </td>
        <td className="border-gray-200 flex items-center justify-center border-r px-4 py-2">
          <Switch
            size="3"
            checked={switchValue}
            onCheckedChange={handleSwitchToggle}
          />
        </td>
      </tr>
    )
  },
)

export { SortableItem }
