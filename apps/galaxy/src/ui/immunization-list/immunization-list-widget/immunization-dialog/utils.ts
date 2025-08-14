import { sanitizeFormData } from '@/utils'
import { formatDate, getDateLabel } from '@/utils/date'
import { ImmunizationDataResponse, ImmunizationTypeEnum } from '../types'
import {
  AdministeredSchemaType,
  HistoricalSchemaType,
  RefusalSchemaType,
} from './forms/schema'

export const getAdministeredInitialValues = (
  data?: ImmunizationDataResponse,
): AdministeredSchemaType => ({
  cvxCode: data?.cvxCode || '',
  mvxCode: data?.mvxCode || '',
  cvxDescription: data?.cvxDescription || '',
  mvxDescription: data?.mvxDescription || '',
  datetimeAdministered: data?.datetimeAdministered
    ? getDateLabel(new Date(data?.datetimeAdministered))
    : getDateLabel(new Date()),
  administeredCode: data?.administeredCode || '',
  fundingCode: data?.fundingCode || '',
  fundingClass: data?.fundingClass || '',
  dose: data?.dose || '',
  units: data?.units || '',
  lotNumber: data?.lotNumber || '',
  expirationDate: data?.expirationDate
    ? getDateLabel(new Date(data?.expirationDate))
    : getDateLabel(new Date()) || '',
  routeCode: data?.routeCode || '',
  siteCode: data?.siteCode || '',
  providerStaffId: data?.providerStaffId?.toString() || '',
  administeringUserId: data?.administeringUserId?.toString() || '',
  ndcCode: data?.ndcCode || '',
  vaccineFPE: data?.vaccineFPE || '',
  manufactureDescription: data?.manufactureDescription || '',
  manufacturInformation: data?.manufacturInformation || '',
  completionStatusCode: data?.completionStatusCode || '',
  entryType: ImmunizationTypeEnum.Administered as const,
})

export const getHistoricalInitialValues = (
  data?: ImmunizationDataResponse,
): HistoricalSchemaType => ({
  cvxCode: data?.cvxCode || '',
  cvxDescription: data?.cvxDescription || '',
  informationCode: data?.manufacturInformation || '',
  datetimeAdministered: data?.datetimeAdministered
    ? getDateLabel(new Date(data?.datetimeAdministered))
    : getDateLabel(new Date()),
  completionStatusCode: data?.completionStatusCode,
  mvxCode: data?.mvxCode,
  entryType: ImmunizationTypeEnum.Historical as const,
})

export const getRefusalInitialValues = (
  data?: ImmunizationDataResponse,
): RefusalSchemaType => ({
  cvxCode: data?.cvxCode || '',
  cvxDescription: data?.cvxDescription || '',
  reasonCode: data?.reasonCode || '',
  datetimeAdministered: data?.datetimeAdministered
    ? getDateLabel(new Date(data?.datetimeAdministered))
    : getDateLabel(new Date()),
  completionStatusCode: data?.completionStatusCode,
  mvxCode: data?.mvxCode,
  entryType: ImmunizationTypeEnum.Refusal as const,
})

export const transformImmunizationData = (
  formData: AdministeredSchemaType | HistoricalSchemaType | RefusalSchemaType,
  appointmentId: string | null,
  isEdit?: boolean,
  dataId?: string,
): AdministeredSchemaType | HistoricalSchemaType | RefusalSchemaType => {
  const basePayload = {
    ...formData,
    appointmentId: appointmentId || undefined,
    id: isEdit ? dataId : undefined,
  }

  formData.mvxCode = formData.mvxCode || '123'

  const formattedDate = formData.datetimeAdministered
    ? formatDate(formData.datetimeAdministered)
    : ''

  if (
    formData.entryType === ImmunizationTypeEnum.Administered ||
    formData.entryType === ImmunizationTypeEnum.Historical
  ) {
    return sanitizeFormData({
      ...basePayload,
      mvxCode: formData.mvxCode,
      datetimeAdministered: formattedDate,
    })
  }

  return sanitizeFormData(basePayload)
}
