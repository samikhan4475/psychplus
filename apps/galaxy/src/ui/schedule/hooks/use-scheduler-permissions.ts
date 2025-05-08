import { useHasPermission } from '@/hooks'

const useSchedulerPermissions = () => {
  const canChangeNonTimedServiceVisitSequence = useHasPermission(
    'changeNonTimedServiceVisitSequence',
  )
  const canChangeVisitStatusToCheckedInOfOtherProviders = useHasPermission(
    'changeVisitStatusToCheckInOfOtherProviderAppointments',
  )
  const canChangeVisitStatusToCheckedInOfSelfAppointments = useHasPermission(
    'changeVisitStatusToCheckInOfSelfAppointments',
  )
  const canChangeVisitStatusToCheckedOut = useHasPermission(
    'changeVisitStatusToCheckedOutWithOutNote',
  )
  const canChangeVisitStatusFromCheckedOut = useHasPermission(
    'changeVisitStatusFromCheckedOutForTimedVisit',
  )
  const canChangeVisitStatusToInRoom = useHasPermission(
    'changeVisitStatusToInRoom',
  )
  const canChangeVisitStatusToConfirmedS = useHasPermission(
    'changeVisitStatusToConfirmedStaff',
  )
  const canChangeVisitStatusToCancelledSForSelfAppointments = useHasPermission(
    'changeVisitStatusToCancelledStaffForSelfAppointments',
  )
  const canChangeVisitStatusToCancelledSForOtherProviders = useHasPermission(
    'changeVisitStatusToCancelledStaffForOtherProviderAppointments',
  )

  const permissionToEditSelfAppointment = useHasPermission(
    'editSelfAppointments',
  )
  const permissionToEditOtherAppointments = useHasPermission(
    'editOtherProviderAppointments',
  )

  const permissionToClickDollarIcon = useHasPermission('clickDollarIcon')

  const changeGroupPermission = useHasPermission('changeGroup')

  const changeUnitPermission = useHasPermission('changeUnit')

  const hasPermissionToChangeLegalStatus = useHasPermission('changeLegal')

  const canChangeNonTimedVisitMedium = useHasPermission(
    'changeNonTimedServiceVisitMedium',
  )

  const canChangeVisitStatusToNoShowForSelfAppointments = useHasPermission(
    'changeVisitStatusToNoShowForSelfAppointments',
  )

  const canChangeVisitStatusToNoShowForOtherProviders = useHasPermission(
    'changeVisitStatusToNoShowForOtherProviderAppointments',
  )

  const canChangeVisitStatusToNoShowAfterVisitStart = useHasPermission(
    'visitStatusToNoShowForOtherProviderAppointmentsAfterStartTime',
  )
  const changeRoomPermission = useHasPermission('changeRoom')

  return {
    canChangeNonTimedServiceVisitSequence,
    canChangeVisitStatusToCheckedInOfOtherProviders,
    canChangeVisitStatusToCheckedInOfSelfAppointments,
    canChangeVisitStatusToCheckedOut,
    canChangeVisitStatusFromCheckedOut,
    canChangeVisitStatusToInRoom,
    canChangeVisitStatusToConfirmedS,
    canChangeVisitStatusToCancelledSForSelfAppointments,
    canChangeVisitStatusToCancelledSForOtherProviders,
    permissionToEditSelfAppointment,
    permissionToEditOtherAppointments,
    permissionToClickDollarIcon,
    changeGroupPermission,
    changeUnitPermission,
    hasPermissionToChangeLegalStatus,
    canChangeNonTimedVisitMedium,
    canChangeVisitStatusToNoShowForSelfAppointments,
    canChangeVisitStatusToNoShowForOtherProviders,
    canChangeVisitStatusToNoShowAfterVisitStart,
    changeRoomPermission,
  }
}

export { useSchedulerPermissions }
