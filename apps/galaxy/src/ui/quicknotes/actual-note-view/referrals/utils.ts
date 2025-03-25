import { getDefaultActualNoteViewStatuses } from '@/ui/referrals/patient-referrals-widget/utils'

const getDefaultPayload = () => ({
  resourceStatusList: getDefaultActualNoteViewStatuses(),
})

export { getDefaultPayload }
