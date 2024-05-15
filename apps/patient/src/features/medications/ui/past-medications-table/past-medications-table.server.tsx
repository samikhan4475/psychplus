import { withSuspense } from '@psychplus-v2/utils'
import { CardContainer, LoadingPlaceholder } from '@/components-v2'
import type { PastMedication } from '../../types'
import { PastMedicationsTable as Client } from './past-medications-table'

const data: PastMedication[] = []

const fetchPastMedications = () =>
  new Promise<PastMedication[]>((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 1500)
  })

type PastMedicationsTableServerProps = Omit<
  React.ComponentProps<typeof Client>,
  'data'
>

const PastMedicationsTableServer = async (
  props: PastMedicationsTableServerProps,
) => {
  const data = await fetchPastMedications()

  return <Client data={data} {...props} />
}

const PastMedicationsTable = withSuspense(PastMedicationsTableServer, {
  fallback: (
    <CardContainer>
      <LoadingPlaceholder />
    </CardContainer>
  ),
})

export { PastMedicationsTable }
