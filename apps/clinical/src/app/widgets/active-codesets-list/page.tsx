import { Text } from '@radix-ui/themes'
import { type SearchParams } from '@psychplus/utils/url'
import { ActiveCodesetsListWidgetServer } from '@/widgets/active-codesets-list'

const ActiceCodesetsListWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  const authorityId = searchParams.authorityId
  const namespace = searchParams.namespace

  if (!authorityId) {
    return <Text>Authority ID is required</Text>
  }

  if (!namespace) {
    return <Text>Namespace is required</Text>
  }

  return (
    <ActiveCodesetsListWidgetServer
      authorityId={authorityId}
      namespace={namespace}
    />
  )
}

export default ActiceCodesetsListWidgetPage
