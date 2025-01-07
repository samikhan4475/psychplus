import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { useStore } from '@/store'

const useProviderId = () => {
  const { staffRoleCode, staffId } = useStore((state) => ({
    staffRoleCode: state.staffResource.staffRoleCode,
    staffId: state.user.staffId,
  }))
  return staffRoleCode === STAFF_ROLE_CODE_PRESCRIBER ? `${staffId}` : undefined
}

export { useProviderId }
