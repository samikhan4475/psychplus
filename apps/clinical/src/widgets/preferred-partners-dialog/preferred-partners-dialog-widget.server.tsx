import { unstable_noStore as noStore } from 'next/cache'
import { PreferredPartnersDialogWidgetClient } from './preferred-partners-dialog-widget.client'

const PreferredPartnersDialogWidgetServer = async () => {
  noStore()

  return <PreferredPartnersDialogWidgetClient />
}

export { PreferredPartnersDialogWidgetServer }
