import toast from 'react-hot-toast'
import { saveWidgetAction } from '@/actions/save-widget'
import {
  Appointment,
  CodesWidgetItem,
  CptCode,
  CptCodeKeys,
  SelectOptionType,
} from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { convertToTimeZoneTime } from '@/utils'
import { CodesWidgetSchemaType } from './codes-widget-schema'
import { transformOut } from './data'

const visitSpecificCodes: CodesWidgetItem[] = [
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99050' },
  { key: CptCodeKeys.MODIFIER_KEY, code: '95' },
  { key: CptCodeKeys.MODIFIER_KEY, code: '25' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99417*3' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99417*4' },
  { key: CptCodeKeys.MODIFIER_KEY, code: '59' },
  // add on codes start here
  { key: CptCodeKeys.ADD_ONS_KEY, code: '96372' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90833' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90836' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90838' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90845' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90837' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90785' },
  // add on codes End here
]
const restrictedVisitsForAddOnCodes = ['SpravatoVisit']
const allowedDuplicateCodes = ['96127']

const getSelectedCodes = (codes: CptCode[]) =>
  codes?.reduce((acc: string[], item) => {
    if (item?.isDefault) {
      acc.push(String(item?.code))
    }
    return acc
  }, [])

const getDefaultSelectedCptCodes = (
  appointment: Appointment,
): CodesWidgetSchemaType => {
  return {
    cptPrimaryCodes: getSelectedCodes(appointment?.cptPrimaryCodes),
    cptAddonCodes: getSelectedCodes(appointment?.cptAddonCodes),
    cptmodifierCodes: getSelectedCodes(appointment?.cptModifiersCodes),
  }
}

const modifyCodesOptions = (
  cptCodes: {
    options: SelectOptionType[]
    codes: CptCode[]
    initialValues?: string[]
  }[],
) => {
  const cptCodesLookup: Record<string, string> = {}
  cptCodes.forEach(({ codes, options, initialValues }) => {
    codes?.forEach((item) => {
      const occurance = initialValues?.filter(
        (code) => code === item.code,
      )?.length
      if (
        occurance &&
        occurance > 1 &&
        allowedDuplicateCodes.includes(item.code)
      ) {
        options.push({
          label: item?.display ?? '',
          value: String(item?.code),
          disabled: item?.isDisabled,
        })
      }
      options.push({
        label: item?.display ?? '',
        value: String(item?.code),
        disabled: item?.isDisabled,
      })
      cptCodesLookup[item?.code] = String(item?.code)
    })
  })
  return cptCodesLookup
}

const getCptCodeOptions = (
  primaryCodes: CptCode[],
  addonCodes: CptCode[],
  modifierCodes: CptCode[],
  initialValues?: CodesWidgetSchemaType,
) => {
  const primaryCodeOptions: SelectOptionType[] = []
  const addOnCodeOptions: SelectOptionType[] = []
  const modifierCodeOptions: SelectOptionType[] = []
  const cptCodes = [
    {
      options: primaryCodeOptions,
      codes: primaryCodes,
      initialValues: initialValues?.cptPrimaryCodes,
    },
    {
      options: modifierCodeOptions,
      codes: modifierCodes,
      initialValues: initialValues?.cptmodifierCodes,
    },
    {
      options: addOnCodeOptions,
      codes: addonCodes,
      initialValues: initialValues?.cptAddonCodes,
    },
  ]
  const cptCodesLookup = modifyCodesOptions(cptCodes)

  return {
    primaryCodeOptions,
    addOnCodeOptions,
    modifierCodeOptions,
    cptCodesLookup,
  }
}

const handleDefaultSubmission = async (
  patientId: string,
  appointmentId: string | undefined,
  values: CodesWidgetSchemaType,
) => {
  if (!values) return

  const payload = {
    patientId,
    data: transformOut(patientId, appointmentId)(values),
  }
  const result = await saveWidgetAction(payload)
  if (result.state === 'error') {
    toast.error('Failed to submit!')
    return
  }
  window.postMessage(
    {
      type: 'widget:save',
      widgetId: QuickNoteSectionName.QuicknoteSectionCodes,
      success: true,
    },
    '*',
  )
  return values
}

const isVisitAfterWorkingHours = (appointment?: Appointment): boolean => {
  const visitHours = convertToTimeZoneTime(
    appointment?.startDate,
    appointment?.locationTimezoneId,
  )
  return Boolean(visitHours?.toString() && (visitHours < 8 || visitHours > 18))
}

const getSortedCptCodes = (
  codes: string[] | undefined,
  cptCodesLookup: Record<string, string>,
): string[] => {
  if (!codes) return []
  const lookUpKeys = Object.keys(cptCodesLookup)
  return codes
    .filter((code) => cptCodesLookup[code])
    .sort((a, b) => lookUpKeys.indexOf(a) - lookUpKeys.indexOf(b))
}

const isCptCodeExist = (codes: CptCode[], code: string) =>
  codes?.some((item) => item?.code === code)

const mergeCodes = (currentCodes: string[], defaultCodes: string[] = []) => {
  let isChanged = false
  const mergedCodes = [...currentCodes]
  defaultCodes?.forEach((code) => {
    if (!mergedCodes.includes(code)) {
      mergedCodes.push(code)
      isChanged = true
    }
  })
  return { mergedCodes, isChanged }
}

const updatedCptCodes = (
  conditions: {
    codes: string[]
    code: string
    condition: boolean
  }[],
) => {
  let isChanged = false
  conditions.forEach(({ code, codes, condition }) => {
    const index = codes.indexOf(code)
    if (condition && index === -1) {
      codes.push(code)
      isChanged = true
    } else if (!condition && index !== -1) {
      codes.splice(index, 1)
      isChanged = true
    }
  })
  return isChanged
}

const getCptCodesConditions = (
  cptAddonCodes: string[],
  cptmodifierCodes: string[],
  appointment: Appointment,
) => {
  const availableAddonsCodes = cptAddonCodes?.filter((code) =>
    isCptCodeExist(appointment?.cptAddonCodes, code),
  )
  return [
    {
      codes: cptmodifierCodes,
      code: '25',
      condition: availableAddonsCodes.length >= 1,
    },
    {
      codes: cptmodifierCodes,
      code: '59',
      condition: availableAddonsCodes.length >= 2,
    },
  ]
}
function getModifiedCptCodes(
  initialValues: CodesWidgetSchemaType,
  appointment: Appointment,
): { isChanged: boolean; updatedCodes: CodesWidgetSchemaType } {
  const defaultCodes = getDefaultSelectedCptCodes(appointment)
  let isChanged = false

  let cptPrimaryCodes = initialValues?.cptPrimaryCodes
  if (!cptPrimaryCodes?.length && defaultCodes?.cptPrimaryCodes?.length) {
    cptPrimaryCodes = defaultCodes.cptPrimaryCodes
    isChanged = true
  }

  const { mergedCodes: cptmodifierCodes, isChanged: isModifierChanged } =
    mergeCodes(initialValues?.cptmodifierCodes, defaultCodes.cptmodifierCodes)

  const { mergedCodes: cptAddonCodes, isChanged: isAddOnsChanged } = mergeCodes(
    initialValues?.cptAddonCodes,
    defaultCodes.cptAddonCodes,
  )

  if (
    isCptCodeExist(appointment?.cptAddonCodes, '99050') &&
    !cptAddonCodes.includes('99050') &&
    isVisitAfterWorkingHours(appointment)
  ) {
    cptAddonCodes.push('99050')
    isChanged = true
  }

  const conditions = getCptCodesConditions(
    cptAddonCodes,
    cptmodifierCodes,
    appointment,
  )

  const isCodesChanged = updatedCptCodes(
    restrictedVisitsForAddOnCodes.includes(appointment.visitType)
      ? []
      : conditions,
  )

  isChanged =
    isChanged || isModifierChanged || isCodesChanged || isAddOnsChanged
  return {
    isChanged,
    updatedCodes: {
      cptPrimaryCodes,
      cptAddonCodes,
      cptmodifierCodes,
    },
  }
}
export {
  handleDefaultSubmission,
  getCptCodeOptions,
  getSortedCptCodes,
  getModifiedCptCodes,
  visitSpecificCodes,
  updatedCptCodes,
}
