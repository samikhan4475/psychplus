import { parseAbsoluteToLocal } from '@internationalized/date'
import { Row } from '@tanstack/react-table'
import { CareTeam } from './types'

const sortOnAddedOn = (a: Row<CareTeam>, b: Row<CareTeam>) => {
  const timeA = parseAbsoluteToLocal(
    a.original?.metadata?.updatedOn ?? a.original?.metadata?.createdOn ?? '',
  )
  const timeB = parseAbsoluteToLocal(
    b.original?.metadata?.updatedOn ?? b.original?.metadata?.createdOn ?? '',
  )
  return timeA.compare(timeB)
}

export { sortOnAddedOn }
