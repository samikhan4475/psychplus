import {
  PrescriptionStatusType,
  type DrugHistory,
  type PrescriptionStatusTypeKey,
} from '@psychplus-v2/scriptsure'
import { getSlashedDateString } from '@psychplus-v2/utils'
import type { ActiveMedication, PrescriptionMessageStatus } from '../types'

const getActiveMedsFromDrugHistory = (
  drugHistory: DrugHistory[],
): ActiveMedication[] => {
  return drugHistory.map((med) => ({
    id: med.prescriptionId.toString(),
    name: med.drugName || '-',
    epn: med.epn || '-',
    dose: med.PrescriptionSigs[0]?.line3 || '-',
    form: med.line1 || '-',
    indication: med.Prescription?.PrescriptionScript?.drugFormat || '-',
    quantity: med.quantity,
    refills: med.Prescription.refill,
    ends: getSlashedDateString(med.drugDuration || '') || '-',
    starts: getSlashedDateString(med.Prescription.fillDate || '') || '-',
    provider: med.Prescription.doctorName || '-',
    pharmacy: med.Prescription.pharmacy || '-',
    status: getPrescriptionMessageStatus(
      med.Prescription.prescriptionStatusTypeId,
    ),
  }))
}

const getPrescriptionMessageStatus = (
  status: PrescriptionStatusTypeKey,
): PrescriptionMessageStatus => {
  return PrescriptionStatusType[status]
}

export { getActiveMedsFromDrugHistory }
