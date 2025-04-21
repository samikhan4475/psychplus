import { Text } from '@radix-ui/themes'
import { QuickNoteSectionItem } from '@/types'
import { useStore } from '@/ui/medications/patient-medications-widget/store'
import {
  PatientMedication,
  PatientPrescriptionStatus,
} from '@/ui/medications/patient-medications-widget/types'
import { formatDateManually } from '@/utils'
import { BlockContainer } from '../shared'

interface Props {
  data?: QuickNoteSectionItem[]
  isNoteView?: boolean
  medicationData: PatientMedication[]
}

const formatMedicationsDetails = (medication: PatientMedication) => {
  const {
    drugDescription,
    medicationDetails,
    quantityValue,
    refills,
    writtenDate,
    endDateTime,
  } = medication
  return [
    drugDescription ?? 'N/A',
    medicationDetails?.strength ?? 'N/A',
    medicationDetails?.directions ?? 'N/A',
    quantityValue ?? 'N/A',
    refills ?? 'N/A',
    formatDateManually(writtenDate) ?? 'N/A',
    formatDateManually(endDateTime) ?? 'N/A',
    medicationDetails?.providerName ?? 'N/A',
  ]?.join(' | ')
}

const Details = ({ data, isNoteView, medicationData }: Props) => {
  const { isPmpReviewed } = useStore()
  let finalIsPmpReviewed = false

  if (isNoteView) {
    if (data?.[0]?.sectionItem === 'isPmpReviewed') {
      finalIsPmpReviewed = data?.[0]?.sectionItemValue === 'Yes'
    }
  } else {
    finalIsPmpReviewed = isPmpReviewed
  }
  return (
    <BlockContainer heading="Medications">
      {finalIsPmpReviewed && <Text size="1"> PMP is Reviewed </Text>}
      {medicationData
        ?.filter(
          (medication) =>
            medication.prescriptionStatusTypeId ===
              Number(PatientPrescriptionStatus.ACTIVE) ||
            Number(PatientPrescriptionStatus.CURRENT_MEDICATION),
        )
        .map((medication) => (
          <Text size="1" key={medication.drugDescription}>
            {formatMedicationsDetails(medication)}
          </Text>
        ))}
    </BlockContainer>
  )
}

export { Details }
