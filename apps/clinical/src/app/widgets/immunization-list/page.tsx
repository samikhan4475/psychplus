import { type SearchParams } from '@psychplus/utils/url'
import { ImmunizationListWidgetServer } from '@/widgets/immunization-list'

const ImmunizationListWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  const { appointmentId } = searchParams

  if (!appointmentId || isNaN(Number(appointmentId)))
    return <div>Valid appointment ID is required</div>

  return <ImmunizationListWidgetServer appointmentId={Number(appointmentId)} />
}

export default ImmunizationListWidgetPage
