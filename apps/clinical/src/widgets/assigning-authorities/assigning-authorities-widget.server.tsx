import { unstable_noStore as noStore } from 'next/cache'
import { getAuthorities } from '@psychplus/codeset/api.server'
import { ToastProvider } from '@psychplus/ui/toast-provider'
import { AssigningAuthoritiesWidgetClient } from './assigning-authorities-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

const AssigningAuthoritiesWidgetServer = async () => {
  noStore()

  const assigningAuthorities = await getAuthorities()

  return (
    <ToastProvider>
      <Preloader store={useStore} assigningAuthorities={assigningAuthorities} />
      <AssigningAuthoritiesWidgetClient />
    </ToastProvider>
  )
}

export { AssigningAuthoritiesWidgetServer }
