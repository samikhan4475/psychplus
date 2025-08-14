interface ImmunizationDataResponse {
  id: string
  datetimeAdministered: string | null
  immunization_name: string
  cvxCode: string
  entryType: keyof typeof ImmunizationTypeEnum | string
  mvxCode: string
  administeringUserFullName: string
  cvxDescription?: string
  mvxDescription?: string
  completionStatusCode?: string
  reasonCode?: string
  administeredCode?: string
  fundingCode?: string
  fundingClass?: string
  appointmentId: string
  dose?: string
  units?: string
  lotNumber?: string
  expirationDate?: string
  routeCode?: string
  siteCode?: string
  providerStaffId?: number | string
  administeringUserId?: number | string
  ndcCode?: string
  vaccineFPE?: string
  manufactureDescription?: string
  manufacturInformation?: string
}

type ImmunizationPayload = {
  appointmentIds?: string[]
  resourceStatusList?: string[]
}

interface ImmunizationResponseList {
  immunizationList: ImmunizationDataResponse[]
  total: number
}

interface CvxCodes {
  id: string
  cvxCode: string
  mvxCode: string
  ndcCode: string
}

export enum ImmunizationTypeEnum {
  Administered = 'Administered',
  Refusal = 'Refusal',
  Historical = 'Historical',
}


export const completionStatusCode = [
  { value: 'CP', label: 'Complete' },
  { value: 'PA', label: 'Partially Administered' },
  { value: 'NA', label: 'Not Administered' },
]

interface BaseFormProps {
  isEdit?: boolean
  closeDialog: () => void
  data: ImmunizationDataResponse
}

export type { ImmunizationDataResponse, ImmunizationPayload, ImmunizationResponseList,CvxCodes,BaseFormProps }
