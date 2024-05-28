import { type SearchParams } from '@psychplus/utils/url'
import { PreferredUserWidgetServer } from '@/widgets/preferred-users'

const PreferredUsers = ({ searchParams }: { searchParams: SearchParams }) => {
  if (!searchParams.id) {
    return <div>Preferred partner Id is required</div>
  }

  return <PreferredUserWidgetServer preferredPartnerId={searchParams.id} />

  // return <PreferredUsersWidgetClient />
}

export default PreferredUsers
