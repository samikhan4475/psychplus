import { Text } from '@radix-ui/themes'
import { PatientMedication } from '@/ui/medications/patient-medications-widget/types'
import { BlockContainer } from '../shared'

interface Props {
  data: PatientMedication[]
}

const formatMedicationsDetails = (medication: PatientMedication) => {
  const { drugDescription, medicationDetails } = medication
  return `${drugDescription} ${medicationDetails.strength} ${medicationDetails.directions}`
}

const Details = ({ data }: Props) => {
  return (
    <BlockContainer heading="Medications">
      {data.map((medication) => (
        <Text size="1" key={medication.drugDescription}>
          {formatMedicationsDetails(medication)}
        </Text>
      ))}
    </BlockContainer>
  )
}

export { Details }
