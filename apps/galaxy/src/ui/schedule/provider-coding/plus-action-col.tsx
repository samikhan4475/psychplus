import { Flex } from '@radix-ui/themes'
import {
  PROVIDER_CODING_VIEW_COLUMNS,
  PROVIDER_CODING_VIEW_COLUMNS_KEY,
} from '../constants'
import { AddColumnsPopover } from '../shared/add-columns-popover'
import { useStore as useRoteStore } from '../store'
import { useStore } from './store'

const PlusActionCol = () => {
  const { saveColumns } = useRoteStore((state) => ({
    saveColumns: state.saveProviderCodingTableColumns,
  }))

  const { columnsStore, setColumnsStore } = useStore((state) => ({
    columnsStore: state.columnsStore,
    setColumnsStore: state.setColumnsStore,
  }))

  return (
    <Flex align="center" justify="center" px="1" height="100%">
      <AddColumnsPopover
        view={'Provider Coding'}
        currentColumns={columnsStore}
        saveCurrentColumns={setColumnsStore}
        viewColumns={PROVIDER_CODING_VIEW_COLUMNS}
        viewColumnsKey={PROVIDER_CODING_VIEW_COLUMNS_KEY}
        onSave={saveColumns}
      />
    </Flex>
  )
}

export { PlusActionCol }
