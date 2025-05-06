import { ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columnsForTableView, columnsGroupedByTestName } from './columns'
import { useStore } from './store'
import { getGroupedTestData, getTableData } from './utils'

interface LabResultTableProps {
  isQuickNoteView?: boolean
}
const LabResultTable = ({ isQuickNoteView }: LabResultTableProps) => {
  const { data, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
  }))

  if (loading) {
    return <LoadingPlaceholder className="bg-white h-full" />
  }

  const processedData = isQuickNoteView
    ? getGroupedTestData(data ?? [])
    : getTableData(data ?? [])

  const columns = isQuickNoteView
    ? columnsGroupedByTestName()
    : columnsForTableView()

  return (
    <ScrollArea
      scrollbars="both"
      className="bg-white max-w-[calc(100vw_-_198px)] overflow-auto p-2"
    >
      <DataTable
        data={processedData}
        columns={columns}
        disablePagination
        sticky
        isRowSpan={isQuickNoteView}
        tableClass={
          isQuickNoteView ? '[&_.rt-ScrollAreaScrollbar]:!hidden' : ''
        }
        tRowClass={isQuickNoteView ? 'bg-gray-3' : ''}
        defaultExpanded={true}
      />
    </ScrollArea>
  )
}

export { LabResultTable }
