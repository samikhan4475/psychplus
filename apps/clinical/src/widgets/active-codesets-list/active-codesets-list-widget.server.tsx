import { unstable_noStore as noStore } from 'next/cache'
import { getActiveCodeSets } from '@psychplus/codeset/api.server'
import { ActiveCodesetsListWidgetClient } from './active-codesets-list-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'
import { createActiveCodeRequestParams } from './utils'

interface AciveCodeListWidgetServerProps {
  authorityId: string
  namespace: string
}
const ActiveCodesetsListWidgetServer = async ({
  authorityId,
  namespace,
}: AciveCodeListWidgetServerProps) => {
  noStore()

  const [assigningAuthority] = await Promise.all([
    getActiveCodeSets(
      createActiveCodeRequestParams({ namespace, authorityId }),
    ),
  ])

  return (
    <>
      <Preloader
        store={useStore}
        assignAuthority={assigningAuthority || []}
        authorityId={authorityId}
        namespace={namespace}
      />
      <ActiveCodesetsListWidgetClient />
    </>
  )
}

export { ActiveCodesetsListWidgetServer }
