import { useHasPermission } from '@/hooks'
import { useVisitStatusCodeset } from './use-visit-status-codeset'

const useInactiveRowStatus = (
  visitStatus: string,
  isServiceTimeDependent: boolean,
) => {
  const inactiveVisitStatusCodes = useVisitStatusCodeset('Inactive')
  const canChangeInactiveToActiveVisitStatus = useHasPermission(
    'changeInActiveToActiveVisitStatusForTimedServices',
  )

  if (
    inactiveVisitStatusCodes.includes(visitStatus) &&
    isServiceTimeDependent
  ) {
    return !canChangeInactiveToActiveVisitStatus
  }
  return false
}

export { useInactiveRowStatus }
