'use client'

import { useParams } from 'next/navigation'
import { LoadingPlaceholder } from '@/components'
import { useGetScriptSureIframeUrl } from '@/hooks'
import { PharmacyIframe } from './pharmacy-iframe'

const PharmacyAddButton = ({
  scriptSureAppUrl,
}: {
  scriptSureAppUrl: string
}) => {
  const { id } = useParams<{ id: string }>()
  const { iframeUrl, loading } = useGetScriptSureIframeUrl(
    id,
    scriptSureAppUrl,
    'pharmacy',
  )
  if (loading) {
    return <LoadingPlaceholder className="h-full" />
  }

  return <PharmacyIframe iframeSrc={iframeUrl} />
}

export { PharmacyAddButton }
