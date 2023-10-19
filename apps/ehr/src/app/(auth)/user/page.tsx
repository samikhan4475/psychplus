import { getAuthToken } from '@psychplus/auth'
import { UserWidgetPortal } from '@psychplus/widgets/client'

const UserPage = () => (
  <div className="h-[400px]">
    <UserWidgetPortal token={getAuthToken()} />
  </div>
)

export default UserPage
