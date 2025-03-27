import { CategoryCode, LevelCode, SettingStatusCode } from '@/constants'
import { AddOthersSettingBody, Encounter, UserSetting } from '@/types'
import { SchemaType } from './schema'

const transformData = ({ data }: { data: UserSetting[] }) => {
  let isPendingStatus = false
  const mappedData = data.reduce((acc, item) => {
    acc[item.name] = item
    if (item.settingStatusCode === SettingStatusCode.Inactive) {
      isPendingStatus = true
    }
    return acc
  }, {} as { [key: string]: UserSetting })
  return { mappedData, isPendingStatus }
}

const transformVisitTypesData = (
  data: Encounter[],
  mappedPreferences: { [key: string]: UserSetting },
) => {
  return data.map((a) => {
    const durationKey = `${a.visitTypeCode}_${a.visitSequence}_${a.visitMedium}`
    const cptKey = `${a.visitTypeCode}_${a.visitSequence}_${a.visitMedium}_CPTCode`

    const defaultDuration = mappedPreferences[durationKey]?.content
    const defaultCPTCode = mappedPreferences[cptKey]?.content
    return {
      defaultDuration,
      defaultCPTCode:
        defaultCPTCode ??
        a?.cptPrimaryCodes?.find((a) => a.isDefault)?.code ??
        '',
      visitTypeCode: a.visitTypeCode,
      visitSequence: a.visitSequence,
      visitMedium: a.visitMedium,
      visitNoteTitle: a.visitNoteTitle,
      cptPrimaryCodes: a.cptPrimaryCodes,
      visitDurationsInMinutes: a.visitDurationsInMinutes,
    }
  })
}

const transformBulkAddUpdate = (
  mappedPreferences: { [key: string]: UserSetting },
  data: SchemaType,
  userId: number,
) => {
  const dataToAdd: AddOthersSettingBody[] = []
  const dataToUpdate: AddOthersSettingBody[] = []
  // this array contains key mappings for backend and frontend keys
  const keys = [
    ['MinutesLeftDoNotShowPublicViewValue', 'publicViewHideMinsBeforeVisit'],
    [
      'MinutesLeftDoNotAllowStaffToBookValue',
      'staffBookingCutoffMinsBeforeVisit',
    ],
    [
      'DayIsFullDoNotShowPublicViewValue',
      'dayIsFullDoNotShowPublicViewPercent',
    ],
    [
      'DayIsFullDoNotAllowStaffToBookValue',
      'dayIsFullDoNotAllowStaffToBookPercent',
    ],
    ['PatientIsInRoomValue', 'patientIsInRoom'],
    ['MinutesLeftFromPatientScheduleValue', 'minutesLeftFromPatientSchedule'],
    [
      'ShowNeitherOnTherapyTimeDependentVisitsValue',
      'showNeitherOnTherapyTimeDependentVisits',
    ],
    [
      'AllowDoubleBookingUnconfirmedTimeDependentVisitsValue',
      'allowDoubleBookingUnconfirmedTimeDependentVisits',
    ],
    ['CosignerInfoDirectSupervisionText', 'cosignerInfoDirectSupervisionText'],
    [
      'CosignerInfoInDirectSupervisionText',
      'cosignerInfoIndirectSupervisionText',
    ],
    ['CosignerInfoDirectSupervisionValue', 'isCosignerInfoDirectSupervision'],
    [
      'CosignerInfoInDirectSupervisionValue',
      'isCosignerInfoIndirectSupervision',
    ],
  ]
  keys.forEach(([bk, fk]) => {
    let value = data?.[fk as keyof SchemaType]
    if (Array.isArray(value)) value = value.join('|')
    if (mappedPreferences[bk].content !== value) {
      if (mappedPreferences[bk].levelCode === 'System') {
        const { id, metadata, ...newSetting } = mappedPreferences[bk]
        dataToAdd.push({
          ...newSetting,
          levelCode: LevelCode.User,
          content: value ?? '',
          settingStatusCode: SettingStatusCode.Inactive,
          userId,
        })
      } else {
        dataToUpdate.push({
          ...mappedPreferences[bk],
          content: value ?? '',
          settingStatusCode: SettingStatusCode.Inactive,
          userId,
        })
      }
    }
  })
  data.visitTypes.forEach((vt) => {
    const durationKey = `${vt.visitTypeCode}_${vt.visitSequence}_${vt.visitMedium}`
    const cptKey = `${vt.visitTypeCode}_${vt.visitSequence}_${vt.visitMedium}_CPTCode`
    const durationSetting = mappedPreferences[durationKey]
    if (
      vt.defaultDuration &&
      durationSetting &&
      durationSetting?.content !== vt.defaultDuration
    ) {
      if (durationSetting?.levelCode === 'System') {
        const { id, metadata, ...newSetting } = durationSetting
        dataToAdd.push({
          ...newSetting,
          levelCode: LevelCode.User,
          content: vt.defaultDuration,
          settingStatusCode: SettingStatusCode.Inactive,
          userId,
        })
      } else {
        dataToUpdate.push({
          ...durationSetting,
          content: vt.defaultDuration,
          settingStatusCode: SettingStatusCode.Inactive,
          userId,
        })
      }
    }

    const cptSetting = mappedPreferences[cptKey]
    if (
      cptSetting?.content &&
      vt?.selectedCPTCode &&
      cptSetting?.content !== vt?.selectedCPTCode
    ) {
      dataToUpdate.push({
        ...cptSetting,
        levelCode: LevelCode.User,
        categoryCode: CategoryCode.Application,
        categoryValue: 'ProviderDefaults',
        name: cptKey,
        content: vt.selectedCPTCode ?? '',
        settingStatusCode: SettingStatusCode.Inactive,
        userId,
      })
    } else if (
      !cptSetting?.content &&
      vt.selectedCPTCode &&
      vt.defaultCPTCode != vt.selectedCPTCode
    ) {
      dataToAdd.push({
        levelCode: LevelCode.User,
        categoryCode: CategoryCode.Application,
        categoryValue: 'ProviderDefaults',
        name: cptKey,
        content: vt.selectedCPTCode ?? '',
        settingStatusCode: SettingStatusCode.Inactive,
        userId,
      })
    }
  })
  return { dataToAdd, dataToUpdate }
}

const transformDataToApprove = (mappedPreferences: UserSetting[]) => {
  return Object.values(mappedPreferences)
    .filter(
      (a) =>
        a.levelCode === LevelCode.User &&
        a.settingStatusCode === SettingStatusCode.Inactive,
    )
    .map((a) => ({
      ...a,
      settingStatusCode: SettingStatusCode.Active,
    }))
}

export {
  transformBulkAddUpdate,
  transformData,
  transformDataToApprove,
  transformVisitTypesData,
}
