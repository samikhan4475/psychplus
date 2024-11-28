import toast from 'react-hot-toast'
import { saveWidgetAction } from '@/actions/save-widget'
import {
  AddonCode,
  Appointment,
  CodesWidgetItem,
  CptCodeKeys,
  PrimaryCode,
  SelectOptionType,
} from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { convertToTimeZoneTime } from '@/utils'
import { CodesWidgetSchemaType } from './codes-widget-schema'
import { transformOut } from './data'

const visitSpecificCodes: CodesWidgetItem[] = [
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99050' },
  { key: CptCodeKeys.MODIFIER_KEY, code: '95 ' },
]
const commonCptCodes = {
  '95': { field: CptCodeKeys.MODIFIER_KEY, value: '95' },
  '99050': { field: CptCodeKeys.ADD_ONS_KEY, value: '99050' },
}

const getDefaultCptCodes = (appointment: Appointment) => {
  return appointment?.cptPrimaryCodes?.reduce(
    (acc: string[], { isDefault, primaryCodes }) => {
      if (isDefault) {
        acc.push(primaryCodes)
      }
      return acc
    },
    [],
  )
}

const getCptCodeOptions = (
  primaryCodes: PrimaryCode[] = [],
  addonCodes: AddonCode[] = [],
) => {
  const primaryCodeOptions: SelectOptionType[] = []
  const addOnCodeOptions: SelectOptionType[] = []
  const cptCodesLookup: Record<string, string> = {}

  primaryCodes.forEach((item) => {
    primaryCodeOptions.push({ label: '', value: item.primaryCodes })
    cptCodesLookup[item.primaryCodes] = item.primaryCodes
  })

  addonCodes.forEach((item) => {
    addOnCodeOptions.push({ label: item.display, value: item.code })
    cptCodesLookup[item.code] = item.code
  })
  return { primaryCodeOptions, addOnCodeOptions, cptCodesLookup }
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

const hasInitialValues = (initialValues: CodesWidgetSchemaType) => {
  return initialValues?.cptPrimaryCodes?.length
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

const mergeCptCodes = (
  currentValues: CodesWidgetSchemaType,
  updatedCptCodes: { field: keyof CodesWidgetSchemaType; value: string }[],
): CodesWidgetSchemaType => {
  return updatedCptCodes.reduce(
    (acc, { field, value }) => {
      if (!acc[field]) {
        acc[field] = []
      }
      acc[field] = [...acc[field], value]
      return acc
    },
    { ...currentValues },
  )
}

const isVirtualAppoinment = (appointment?: Appointment) => {
  return appointment?.type === 'Virtual'
}

const isVisitAfterWorkingHours = (appointment?: Appointment) => {
  const visitHours = convertToTimeZoneTime(
    appointment?.startDate,
    appointment?.locationtimzoneId,
  )
  return visitHours && (visitHours < 8 || visitHours > 18)
}

export {
  handleDefaultSubmission,
  getDefaultCptCodes,
  getCptCodeOptions,
  hasInitialValues,
  getSortedCptCodes,
  visitSpecificCodes,
  mergeCptCodes,
  isVirtualAppoinment,
  isVisitAfterWorkingHours,
  commonCptCodes,
}
