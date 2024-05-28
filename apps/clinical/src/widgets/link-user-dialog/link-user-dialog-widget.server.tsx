import { unstable_noStore as noStore } from 'next/cache'
import { getCodeSets } from '@psychplus/codeset/api.server'
import { getPatients } from '@psychplus/patient/api.server'
import { LinkUserDialogWidgetClient } from './link-user-dialog-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

const LinkUserDialogWidgetServer = async ({
  preferredPartnerId,
}: {
  preferredPartnerId: string
}) => {
  noStore()

  const [patients, codeSets] = await Promise.all([getPatients(), getCodeSets()])

  return (
    <>
      <Preloader
        codeSets={codeSets}
        store={useStore}
        patients={patients}
        preferredPartnerId={preferredPartnerId}
      />
      <LinkUserDialogWidgetClient />
    </>
  )
}
export { LinkUserDialogWidgetServer }
