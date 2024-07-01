import { type SearchParams } from '@psychplus/utils/url'
import { PreferredPartnersWidgetServer } from '@/widgets/patient-preferred-partners'
import { Text } from '@radix-ui/themes'

const PreferredPartnersWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.patientId) {
    return <Text>Patient ID is required</Text>
  }

  return (
    <PreferredPartnersWidgetServer patientId={Number(searchParams.patientId)} />
  )
}

export default PreferredPartnersWidgetPage
