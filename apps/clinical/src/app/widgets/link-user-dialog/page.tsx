import { SearchParams } from '@psychplus/utils/url'
import { LinkUserDialogWidgetServer } from '@/widgets/link-user-dialog'

const LinkUserDialog = ({ searchParams }: { searchParams: SearchParams }) => {
  if (!searchParams.id) {
    return <div>Preferred partner Id is required</div>
  }

  return <LinkUserDialogWidgetServer preferredPartnerId={searchParams.id} />
}

export default LinkUserDialog
