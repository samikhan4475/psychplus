import React, { useState } from 'react'
import { Box } from '@radix-ui/themes'
import { SortEnd } from 'react-sortable-hoc'
import { UserSetting } from '@psychplus/ccda-setting-preference'
import { updateUserSettings } from '@psychplus/ccda-setting-preference/api.client'
import { FormSubmitButton } from '@psychplus/form'
import { useStore } from '../../store'
import { SortableList } from '../sortable-list'
import { reindex_items } from '../utils'

const CcdaSettingPreferenceTable = () => {
  const { user_settings, setUserSettings } = useStore()
  const [items, setItems] = useState(user_settings)
  const updateItmes = (items: UserSetting[]) => {
    setItems(items)
  }
  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    setItems((prevItems) => {
      const newItems = [...prevItems]
      const [movedItem] = newItems.splice(oldIndex, 1)
      newItems.splice(newIndex, 0, movedItem)

      return newItems
    })
  }

  const handleSave = async () => {
    const result = reindex_items(items)
    const user_settings = await updateUserSettings(result)
    setUserSettings(user_settings)
  }

  return (
    <Box>
      <table className="border-gray-200 w-full table-auto border">
        <thead>
          <tr>
            <th className="border-gray-200 border-b border-l border-r border-t px-4 py-2">
              Module Name
            </th>
            <th className="border-b border-r border-t px-4 py-2">Enable</th>
          </tr>
        </thead>
        <SortableList
          onSortEnd={onSortEnd}
          useDragHandle={true}
          items={items}
          setItems={updateItmes}
        />
      </table>
      <Box className="mt-9 flex justify-end">
        <FormSubmitButton
          className="rounded-2 bg-[#151B4A] px-4 py-2 text-[white]"
          onClick={handleSave}
        >
          Save
        </FormSubmitButton>
      </Box>
    </Box>
  )
}

export { CcdaSettingPreferenceTable }
