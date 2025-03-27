import { UserSetting } from '@/types'
import { VisitTypes } from './types'

const getInitialValues = (
  mappedPreferences: {
    [key: string]: UserSetting
  },
  visitTypes: VisitTypes[],
) => {
  const {
    MinutesLeftDoNotShowPublicViewValue,
    MinutesLeftDoNotAllowStaffToBookValue,
    DayIsFullDoNotShowPublicViewValue,
    DayIsFullDoNotAllowStaffToBookValue,

    PatientIsInRoomValue,
    MinutesLeftFromPatientScheduleValue,
    ShowNeitherOnTherapyTimeDependentVisitsValue,
    AllowDoubleBookingUnconfirmedTimeDependentVisitsValue,

    CosignerInfoDirectSupervisionText,
    CosignerInfoInDirectSupervisionText,
    CosignerInfoDirectSupervisionValue,
    CosignerInfoInDirectSupervisionValue,
  } = mappedPreferences
  return {
    // Public View
    publicViewHideMinsBeforeVisit: MinutesLeftDoNotShowPublicViewValue?.content,
    staffBookingCutoffMinsBeforeVisit:
      MinutesLeftDoNotAllowStaffToBookValue?.content,
    dayIsFullDoNotShowPublicViewPercent:
      DayIsFullDoNotShowPublicViewValue?.content?.split('|'),
    dayIsFullDoNotAllowStaffToBookPercent:
      DayIsFullDoNotAllowStaffToBookValue?.content?.split('|'),

    // Alerts View
    patientIsInRoom: PatientIsInRoomValue?.content,
    minutesLeftFromPatientSchedule:
      MinutesLeftFromPatientScheduleValue?.content,
    showNeitherOnTherapyTimeDependentVisits:
      ShowNeitherOnTherapyTimeDependentVisitsValue?.content,
    allowDoubleBookingUnconfirmedTimeDependentVisits:
      AllowDoubleBookingUnconfirmedTimeDependentVisitsValue?.content,

    // Cosigner Info
    cosignerInfoDirectSupervisionText:
      CosignerInfoDirectSupervisionText?.content ?? '',
    cosignerInfoIndirectSupervisionText:
      CosignerInfoInDirectSupervisionText?.content ?? '',
    isCosignerInfoDirectSupervision:
      CosignerInfoDirectSupervisionValue?.content,
    isCosignerInfoIndirectSupervision:
      CosignerInfoInDirectSupervisionValue?.content,

    // Visit Types
    visitTypes: visitTypes,
  }
}

export { getInitialValues }
