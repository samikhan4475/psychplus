import { useVisitStatusCodeset } from './use-visit-status-codeset'

const useInactiveRowStatus = (
  visitStatus: string,
  isServiceTimeDependent: boolean,
) => {
  const inactiveVisitStatusCodes = useVisitStatusCodeset('Inactive')
  if (!isServiceTimeDependent) return false
  return inactiveVisitStatusCodes.includes(visitStatus)
}

export { useInactiveRowStatus }
