import { useMemo } from 'react'
import { useStore } from '@/store'

const useOrganizationMember = (organizationId?: string) => {
  const { organizationIds, staffTypes } = useStore(
    (state) => state.staffResource,
  )

  const isMember = useMemo(() => {
    if (staffTypes && staffTypes.includes('SuperAdmin')) {
      return true
    }
    if (!organizationId || !organizationIds) return false
    return organizationIds.includes(organizationId)
  }, [organizationId, organizationIds])

  return isMember
}

export { useOrganizationMember }
