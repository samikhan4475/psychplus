import { withSuspense } from '@psychplus-v2/utils'
import { CardContainer, LoadingPlaceholder } from '@/components-v2'
import { getPatientMedications } from '../../api'
import MedicationTable from '@/features/pre-checkin-assessment/ui/steps/allergies-and-medications/medication/blocks/medication-table'

const ActiveMedicationsTableServer = async () => {
  const patientMedicationsResponse = await getPatientMedications()

  const medications =
    patientMedicationsResponse.state === 'error'
      ? []
      : patientMedicationsResponse.data

  return <MedicationTable medications={medications} />
}

const ActiveMedicationsTable = withSuspense(ActiveMedicationsTableServer, {
  fallback: (
    <CardContainer>
      <LoadingPlaceholder />
    </CardContainer>
  ),
})

export { ActiveMedicationsTable }
