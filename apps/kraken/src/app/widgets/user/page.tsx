import type { SearchParams } from '@psychplus/types'
import { UserWidgetServer } from '@/widgets/user'

const UserWidgetPage = ({ searchParams }: { searchParams: SearchParams }) => {
  if (!searchParams.token) {
    return <div>Token is required</div>
  }

  return <UserWidgetServer token={searchParams.token} />
}

export default UserWidgetPage
