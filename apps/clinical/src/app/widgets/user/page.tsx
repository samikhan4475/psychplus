import { withAPI } from '@psychplus/ui/with-api'
import { UserWidgetServer } from '@/widgets/user'

const UserWidgetPage = () => {
  return <UserWidgetServer />
}

export default withAPI(UserWidgetPage)
