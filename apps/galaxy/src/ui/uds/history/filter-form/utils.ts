import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getDiagnosisSections } from '../../uds-widget/data'

export const createUdsPayload = async ({
  patientId,
  appointmentId,
  data,
  diagnosisData,
  isHospitalDischargeView,
}: {
  patientId: string
  appointmentId: string | null
  data: QuickNoteSectionItem[]
  diagnosisData: QuickNoteSectionItem[]
  isHospitalDischargeView: boolean
}): Promise<QuickNoteSectionItem[]> => {
  const medicalNecessity = data.find(
    (item) => item.sectionItem === 'medicalNecessity',
  )

  const medicalNecessityData =
    medicalNecessity?.sectionItemValue.split(',') ?? []

  const diagnosisSections = await getDiagnosisSections(
    medicalNecessityData,
    patientId,
    diagnosisData,
    true,
    isHospitalDischargeView,
  )

  const enrichedData = data.map((item) => ({
    ...item,
    sectionName: QuickNoteSectionName.QuicknoteSectionUds,
    pid: Number(patientId),
    appId: Number(appointmentId),
  }))

  return [
    ...enrichedData,
    ...diagnosisSections.filter((item) => item.sectionItemValue !== ''),
  ]
}
