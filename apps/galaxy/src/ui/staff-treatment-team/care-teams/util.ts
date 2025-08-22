import { parseAbsoluteToLocal } from '@internationalized/date'
import { Row } from '@tanstack/react-table'
import { Metadata } from '@/types'

const sortHistory = <T extends { metadata: Metadata }>(
  a: Row<T>,
  b: Row<T>,
) => {
  const dateA =
    a.original?.metadata?.updatedOn ?? a.original?.metadata?.createdOn
  const dateB =
    b.original?.metadata?.updatedOn ?? b.original?.metadata?.createdOn

  if (!dateA && !dateB) return 0

  if (!dateA) return 1
  if (!dateB) return -1

  const timeA = parseAbsoluteToLocal(dateA)
  const timeB = parseAbsoluteToLocal(dateB)

  return timeA.compare(timeB)
}

const sortOnAddedOn = <T extends { metadata: Metadata }>(
  a: Row<T>,
  b: Row<T>,
) => {
  const timeA = parseAbsoluteToLocal(a.original?.metadata?.createdOn ?? '')
  const timeB = parseAbsoluteToLocal(b.original?.metadata?.createdOn ?? '')
  return timeA.compare(timeB)
}

export { sortHistory, sortOnAddedOn }
