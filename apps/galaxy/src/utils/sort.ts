import { type SortDirection } from '@tanstack/react-table'
import type { QuickNoteSectionItem, Sort } from '@/types'

const getSortDir = (column: string, sort?: Sort) => {
  if (!sort || sort.column !== column) {
    return undefined
  }
  return sort.direction
}

const getNewSortDir = (column: string, sort?: Sort) => {
  const isColumnSorted = sort?.column === column
  let direction: SortDirection = 'desc'

  if (isColumnSorted) {
    direction = sort.direction === 'asc' ? 'desc' : 'asc'
  }
  return direction
}

//This helper is to sort quicknote sectionItem
const filterAndSort = (
  data: QuickNoteSectionItem[] = [],
  filterValue: string,
) => {
  const sortedData = data
    ?.filter((item) => item.sectionItem === filterValue)
    ?.sort((a, b) => {
      if (a?.metadata?.updatedOn && b?.metadata?.updatedOn) {
        return (
          new Date(b.metadata.updatedOn).getTime() -
          new Date(a.metadata.updatedOn).getTime()
        )
      }
      return 0
    })

  const allData = data?.filter((item) => item.sectionItem !== filterValue) ?? []
  if (sortedData?.[0]) {
    allData.push(sortedData?.[0])
  }

  return [allData, sortedData?.reverse()]
}

export { getSortDir, getNewSortDir, filterAndSort }
