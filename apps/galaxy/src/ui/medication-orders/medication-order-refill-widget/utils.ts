import toast from 'react-hot-toast'
import { sanitizeFormData } from '@/utils'
import { rxChangeRequestAction, rxRenewalAction } from './actions'
import { UpdateMedicationSchema } from './dialogs/schema'
import { RenewalResponseTypeEnum } from './types'

export const handleRxApproval = async (
  data: UpdateMedicationSchema,
): Promise<boolean> => {
  for (const row of data.drugList ?? []) {
    const payload = {
      responseType: RenewalResponseTypeEnum.Approved,
      note: row.notes,
      rxRenewalResponseDrugDetail: {
        drugDescription: row?.drugDescription ?? '',
        quantityValue: row?.quantityValue?.toString() ?? '0',
        isSubstitutionsAllowed: row?.isSubstitutionsAllowed ?? false,
        drugCode: row?.drugCode ?? '',
        drugCodeQualifier: row?.drugCodeQualifier ?? '',
        daysSupply: row?.daysSupply?.toString() ?? '0',
        signatureText: row?.drugSignatureList?.[0]?.signatureText,
        quantityCodeListQualifier: row?.quantityCodeListQualifier,
        quantityUnitOfMeasureCode: row?.quantityUnitOfMeasureCode,
        refills: row.refills,
        drugNote: row.notes,
        priorAuthorizationCode: row?.priorAuthorizationCode,
        priorAuthorizationStatus: row?.priorAuthorizationStatus,
        ...('deaSchedule' in row && { deaSchedule: row.deaSchedule }),
      },
    }
    const sanitizeData = sanitizeFormData(payload)
    const response = await rxRenewalAction(
      data.pharmacyNotificationId ?? '',
      sanitizeData,
    )

    if (response.state === 'success') {
      toast.success('Medication request is approved successfully')
    } else {
      toast.error(response.error ?? 'Failed to approve')
    }
  }
  return true
}
export const handleChangeRequestApproval = async (
  data: UpdateMedicationSchema,
): Promise<boolean> => {
  const date = new Date()
  for (const row of data.drugList ?? []) {
    const diagnosisList = row.drugDiagnosisList ?? []
    const diagnoses = []

    for (let i = 0; i < diagnosisList.length; i += 2) {
      const primary = diagnosisList[i]
      const secondary = diagnosisList[i + 1]

      diagnoses.push({
        clinicalInformationQualifier: 0,
        primary: {
          code: primary.diagnosisCode,
          qualifier: 'ABF',
          description: primary.diagnosisDescription ?? '',
        },
        secondary: secondary
          ? {
              code: secondary.diagnosisCode,
              qualifier: 'ABF',
              description: secondary.diagnosisDescription ?? '',
            }
          : undefined,
      })
    }
    const payload = {
      responseType:
        data?.rxChangeRequestCode === 'PrescriberAuthorizationRequired'
          ? RenewalResponseTypeEnum.Validated
          : RenewalResponseTypeEnum.Approved,
      note: row.notes,
      validatedResponseDate: date.toISOString().split('T')[0],
      rxChangeResponseDrugDetail: {
        drugCode: row?.drugCode ?? '',
        drugCodeQualifier: row?.drugCodeQualifier ?? '',
        drugDescription: row?.drugDescription ?? '',
        quantityValue: row?.quantityValue?.toString() ?? '0',
        quantityCodeListQualifier: row?.quantityCodeListQualifier,
        quantityUnitOfMeasureCode: row?.quantityUnitOfMeasureCode,
        signatureText: row?.drugSignatureList?.[0]?.signatureText,
        refills: row.refills,
        isSubstitutionsAllowed: row?.isSubstitutionsAllowed ?? false,
        daysSupply: row?.daysSupply?.toString() ?? '0',
        priorAuthorizationCode: row?.priorAuthorizationCode,
        priorAuthorizationStatus: row?.priorAuthorizationStatus,
        drugNote: row.notes,
        ...('deaSchedule' in row && { deaSchedule: row.deaSchedule }),
        diagnoses: diagnoses,
      },
    }

    const sanitizeData = sanitizeFormData(payload)

    const response = await rxChangeRequestAction(
      data.pharmacyNotificationId ?? '',
      sanitizeData,
    )
    if (response.state === 'success') {
      toast.success('Medication request is approved successfully')
    } else {
      toast.error(response.error ?? 'Failed to approve')
    }
  }
  return true
}
