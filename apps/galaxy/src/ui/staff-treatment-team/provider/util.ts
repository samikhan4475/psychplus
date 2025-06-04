import { Row } from '@tanstack/react-table'
import { Patient } from './types'

const sortOnAddedOn = (a: Row<Patient>, b: Row<Patient>) => {
  const timeA = new Date(a.original?.addedOn ?? '')
  const timeB = new Date(b.original?.addedOn ?? '')
  return timeB.getTime() - timeA.getTime()
}

export { sortOnAddedOn }
