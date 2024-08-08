import { getDrugHistory } from '@psychplus-v2/scriptsure/api'
import { withSuspense } from '@psychplus-v2/utils'
import { getProfile } from '@/api'
import { CardContainer, LoadingPlaceholder } from '@/components-v2'
import { getActiveMedsFromDrugHistory } from '../../utils'
import { ActiveMedicationsTable as Client } from './active-medications-table'

type ActiveMedicationsTableServerProps = Omit<
  React.ComponentProps<typeof Client>,
  'data'
>

const ActiveMedicationsTableServer = async (
  props: ActiveMedicationsTableServerProps,
) => {
  const profile = await getProfile()
  if (profile.state === 'error') {
    throw new Error(profile.error)
  }

  const drugHistory = await getDrugHistory(profile.data)
  const activeMedications = getActiveMedsFromDrugHistory(drugHistory)

  return <Client data={activeMedications} {...props} />
}

const ActiveMedicationsTable = withSuspense(ActiveMedicationsTableServer, {
  fallback: (
    <CardContainer>
      <LoadingPlaceholder />
    </CardContainer>
  ),
})

export { ActiveMedicationsTable }
