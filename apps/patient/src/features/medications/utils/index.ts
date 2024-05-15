import { type DrugHistory } from '@psychplus-v2/scriptsure'
import { getSlashedDateString } from '@psychplus-v2/utils'
import type { ActiveMedication, PrescriptionMessageStatus } from '../types'

const PRESCRIPTION_STATUS_ACTIVE = 1

const getActiveMedsFromDrugHistory = (
  drugHistory: DrugHistory[],
): ActiveMedication[] => {
  return drugHistory
    .filter(
      (med) =>
        med.Prescription.prescriptionStatusTypeId ===
        PRESCRIPTION_STATUS_ACTIVE,
    )
    .map((med) => ({
      id: med.prescriptionId.toString(),
      name: med.drugName,
      epn: med.epn,
      directions: med.PrescriptionSigs[0]?.line3 ?? 'N/A',
      supply: med.quantity * (med.Prescription.refill + 1),
      refills: med.Prescription.refill,
      ends: getSlashedDateString(med.drugDuration),
      provider: med.Prescription.doctorName,
      pharmacy: med.Prescription.pharmacy,
      status: getPrescriptionMessageStatus(med.Prescription.messageStatus),
    }))
}

const getPrescriptionMessageStatus = (
  status: string | null,
): PrescriptionMessageStatus => {
  if (status === 'Success' || status === 'Error') {
    return status
  }
  return 'Pending'
}

export { getActiveMedsFromDrugHistory }
