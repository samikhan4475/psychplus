import { Flex } from '@radix-ui/themes'
import { LIST_VIEW_COLUMNS, LIST_VIEW_COLUMNS_KEY } from '../constants'
import { AddColumnsPopover } from '../shared/add-columns-popover'
import { useStore as useRootStore } from '../store'
import { useStore } from './store'

const PlusActionCol = () => {
  const { saveColumns } = useRootStore((state) => ({
    saveColumns: state.saveListTableColumns,
  }))

  const { columnsStore, setColumnsStore } = useStore((state) => ({
    columnsStore: state.columnsStore,
    setColumnsStore: state.setColumnsStore,
  }))

  return (
    <Flex align="center" justify="center" px="1" height="100%">
      <AddColumnsPopover
        view={'List View'}
        currentColumns={columnsStore}
        saveCurrentColumns={setColumnsStore}
        viewColumns={LIST_VIEW_COLUMNS}
        viewColumnsKey={LIST_VIEW_COLUMNS_KEY}
        onSave={saveColumns}
      />
    </Flex>
  )
}

export { PlusActionCol }
