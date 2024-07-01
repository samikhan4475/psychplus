import { type SearchParams } from '@psychplus/utils/url'
import { LinkAccountWidgetServer } from '@/widgets/link-account/link-account-widget.server'
import { Text } from '@radix-ui/themes'

const PatientInformationWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.patientId) {
    return <Text>Patient ID is required</Text>
  }

  return (
    <LinkAccountWidgetServer patientId={Number(searchParams.patientId)} />
  )
}

export default PatientInformationWidgetPage
