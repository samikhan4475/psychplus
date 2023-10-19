import type { SearchParams } from '@psychplus/types'
import { UserWidgetServer } from '@psychplus/widgets/server'

const UserWidgetPage = ({ searchParams }: { searchParams: SearchParams }) => (
  <UserWidgetServer token={searchParams.token} />
)

export default UserWidgetPage
