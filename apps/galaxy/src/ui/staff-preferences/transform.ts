import { CategoryCode, LevelCode, SettingStatusCode } from '@/constants'
import { AddOthersSettingBody, Encounter, UserSetting } from '@/types'
import {
  AlertSchemaType,
  CosignerInfoSchemaType,
  PublicSchemaType,
  VisitTypesSchemaType,
} from './schema'
import { VisitTypes } from './types'

// this arrays contains key mappings for backend and frontend keys
const publicKeyMappings: [string, string][] = [
  ['MinutesLeftDoNotShowPublicViewValue', 'publicViewHideMinsBeforeVisit'],
  [
    'MinutesLeftDoNotAllowStaffToBookValue',
    'staffBookingCutoffMinsBeforeVisit',
  ],
  ['DayIsFullDoNotShowPublicViewValue', 'dayIsFullDoNotShowPublicViewPercent'],
  [
    'DayIsFullDoNotAllowStaffToBookValue',
    'dayIsFullDoNotAllowStaffToBookPercent',
  ],
]
const alertKeyMappings: [string, string][] = [
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
]
const cosignerKeyMappings: [string, string][] = [
  ['CosignerInfoDirectSupervisionText', 'cosignerInfoDirectSupervisionText'],
  [
    'CosignerInfoInDirectSupervisionText',
    'cosignerInfoInDirectSupervisionText',
  ],
  ['CosignerInfoDirectSupervisionValue', 'isCosignerInfoDirectSupervision'],
  ['CosignerInfoInDirectSupervisionValue', 'isCosignerInfoIndirectSupervision'],
]

const transformResponse = ({ data }: { data: UserSetting[] }) => {
  const dashboardStatus = {
    public: false,
    alert: false,
    cosigner: false,
    visit: false,
  }
  const mappedData = data.reduce((acc, item) => {
    acc[item.name] = item
    if (item.settingStatusCode === SettingStatusCode.Inactive) {
      if (publicKeyMappings.some(([bk]) => bk === item.name)) {
        dashboardStatus.public = true
      } else if (alertKeyMappings.some(([bk]) => bk === item.name)) {
        dashboardStatus.alert = true
      } else if (cosignerKeyMappings.some(([bk]) => bk === item.name)) {
        dashboardStatus.cosigner = true
      } else {
        dashboardStatus.visit = true
      }
    }
    return acc
  }, {} as { [key: string]: UserSetting })
  return { dashboardStatus, mappedData }
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
const transformSettingsForBulkAddUpdate = (
  mappedPreferences: { [key: string]: UserSetting },
  data: Record<string, string | string[]>,
  keyMappings: [string, string][],
  userId: number,
) => {
  const dataToAdd: AddOthersSettingBody[] = []
  const dataToUpdate: AddOthersSettingBody[] = []

  keyMappings.forEach(([bk, fk]) => {
    let value = data?.[fk]
    if (!value) return
    if (Array.isArray(value)) value = value.join('|')
    if (mappedPreferences[bk]?.content !== value) {
      if (mappedPreferences[bk]?.levelCode === 'System') {
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

  return { dataToAdd, dataToUpdate }
}

const transformPublicSettingsForBulkAddUpdate = (
  mappedPreferences: { [key: string]: UserSetting },
  data: PublicSchemaType,
  userId: number,
) => {
  return transformSettingsForBulkAddUpdate(
    mappedPreferences,
    data,
    publicKeyMappings,
    userId,
  )
}

const transformAlertSettingsForBulkAddUpdate = (
  mappedPreferences: { [key: string]: UserSetting },
  data: AlertSchemaType,
  userId: number,
) => {
  return transformSettingsForBulkAddUpdate(
    mappedPreferences,
    data,
    alertKeyMappings,
    userId,
  )
}

const transformCosignerSettingsForBulkAddUpdate = (
  mappedPreferences: { [key: string]: UserSetting },
  data: CosignerInfoSchemaType,
  userId: number,
) => {
  return transformSettingsForBulkAddUpdate(
    mappedPreferences,
    data,
    cosignerKeyMappings,
    userId,
  )
}

const transformVisitTypesDataForBulkAddUpdate = (
  mappedPreferences: { [key: string]: UserSetting },
  data: VisitTypesSchemaType,
  userId: number,
) => {
  const dataToAdd: AddOthersSettingBody[] = []
  const dataToUpdate: AddOthersSettingBody[] = []

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
      vt.defaultCPTCode !== vt.selectedCPTCode
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

const transformSettingsToApprove = (
  mappedPreferences: { [key: string]: UserSetting },
  type: 'all' | 'public' | 'alert' | 'cosigner' | 'visit',
  visitTypes?: VisitTypes[],
) => {
  if (type === 'all') {
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

  let keyMappings: [string, string][] = []

  if (type === 'public') {
    keyMappings = publicKeyMappings
  } else if (type === 'alert') {
    keyMappings = alertKeyMappings
  } else if (type === 'cosigner') {
    keyMappings = cosignerKeyMappings
  } else if (type === 'visit' && visitTypes) {
    const keys = visitTypes.flatMap((vt) => [
      `${vt.visitTypeCode}_${vt.visitSequence}_${vt.visitMedium}`,
      `${vt.visitTypeCode}_${vt.visitSequence}_${vt.visitMedium}_CPTCode`,
    ])
    return keys
      .map((key) => mappedPreferences[key])
      .filter(
        (a) =>
          a?.levelCode === LevelCode.User &&
          a?.settingStatusCode === SettingStatusCode.Inactive,
      )
      .map((a) => ({
        ...a,
        settingStatusCode: SettingStatusCode.Active,
      }))
  }

  return keyMappings
    .map(([bk]) => mappedPreferences[bk])
    .filter(
      (a) =>
        a?.levelCode === LevelCode.User &&
        a?.settingStatusCode === SettingStatusCode.Inactive,
    )
    .map((a) => ({
      ...a,
      settingStatusCode: SettingStatusCode.Active,
    }))
}

export {
  transformAlertSettingsForBulkAddUpdate,
  transformCosignerSettingsForBulkAddUpdate,
  transformDataToApprove,
  transformPublicSettingsForBulkAddUpdate,
  transformResponse,
  transformSettingsToApprove,
  transformVisitTypesData,
  transformVisitTypesDataForBulkAddUpdate,
}
