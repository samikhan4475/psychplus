import { parseAbsoluteToLocal } from '@internationalized/date'
import { Row } from '@tanstack/react-table'
import { Metadata } from '@/types'

const sortHistory = <T extends { metadata: Metadata }>(
  a: Row<T>,
  b: Row<T>,
) => {
  const metadataA = a.original?.metadata
  const metadataB = b.original?.metadata
  const timeA = parseAbsoluteToLocal(
    metadataA?.updatedOn ?? metadataA?.createdOn ?? '',
  )
  const timeB = parseAbsoluteToLocal(
    metadataB?.updatedOn ?? metadataB?.createdOn ?? '',
  )
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
