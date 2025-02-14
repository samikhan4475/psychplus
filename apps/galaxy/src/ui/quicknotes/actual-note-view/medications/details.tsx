import { Text } from '@radix-ui/themes'
import { QuickNoteSectionItem } from '@/types'
import { useStore } from '@/ui/medications/patient-medications-widget/store'
import { PatientMedication } from '@/ui/medications/patient-medications-widget/types'
import { BlockContainer } from '../shared'

interface Props {
  data?: QuickNoteSectionItem[]
  isNoteView?: boolean
  medicationData: PatientMedication[]
}

const formatMedicationsDetails = (medication: PatientMedication) => {
  const { drugDescription, medicationDetails } = medication
  return `${drugDescription} ${medicationDetails.strength} ${medicationDetails.directions}`
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
      {medicationData?.filter(medication => medication.prescriptionStatusTypeId === 1).map((medication) => (
        <Text size="1" key={medication.drugDescription}>
          {formatMedicationsDetails(medication)}
        </Text>
      ))}
    </BlockContainer>
  )
}

export { Details }
