import { withSuspense } from '@psychplus-v2/utils'
import { CardContainer, LoadingPlaceholder } from '@/components-v2'
import { ActiveMedicationsTable as Client } from './active-medications-table'

type ActiveMedicationsTableServerProps = Omit<
  React.ComponentProps<typeof Client>,
  'data'
>

const ActiveMedicationsTableServer = async (
  props: ActiveMedicationsTableServerProps,
) => {
  // const profile = await getProfile()
  // if (profile.state === 'error') {
  //   throw new Error(profile.error)
  // }

  // const drugHistory = await getDrugHistory(profile.data)
  // const activeMedications = getActiveMedsFromDrugHistory(drugHistory)

  return <Client data={[]} {...props} />
}

const ActiveMedicationsTable = withSuspense(ActiveMedicationsTableServer, {
  fallback: (
    <CardContainer>
      <LoadingPlaceholder />
    </CardContainer>
  ),
})

export { ActiveMedicationsTable }
