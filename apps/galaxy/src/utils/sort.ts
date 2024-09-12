import { type SortDirection } from '@tanstack/react-table'
import type { Sort } from '@/types'

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

export { getSortDir, getNewSortDir }
