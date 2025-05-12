import { withSuspense } from '@psychplus-v2/utils'
import { Text } from '@radix-ui/themes'
import { CardContainer, LoadingPlaceholder } from '@/components-v2'
import { getPreferredPartnerList } from './api.ts'
import { PreferredPartnerTable as Client } from './preferred-partner-table.tsx'

type PreferredPartnerTableServerProps = Omit<
  React.ComponentProps<typeof Client>,
  'data'
>

const PreferredPartnerTableServer = async (
  props: PreferredPartnerTableServerProps,
) => {
  const preferredPartnersResponse = await getPreferredPartnerList()

  if (preferredPartnersResponse.state === 'error') {
    return <Text>{preferredPartnersResponse.error}</Text>
  }

  return <Client data={preferredPartnersResponse.data} {...props} />
}

const PreferredPartnerTable = withSuspense(PreferredPartnerTableServer, {
  fallback: (
    <CardContainer>
      <LoadingPlaceholder />
    </CardContainer>
  ),
})

export { PreferredPartnerTable }
