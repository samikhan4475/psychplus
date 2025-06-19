import React from 'react'
import { CODESETS } from '@psychplus-v2/constants'
import { getCodesets } from '@/api'
import { ViewContainer } from '@/components-v2'
import AfterVisitSummaryView from '@/features/appointments/avs/ui/after-visit-summary-view'
import { CodesetStoreProvider } from '@/providers'

const AfterVisitSummaryPage = async () => {
  const codesets = await getCodesets([
    CODESETS.ContactMadeStatus,
    CODESETS.ServicesOffered,
  ])

  return (
    <CodesetStoreProvider codesets={codesets}>
      <ViewContainer className={'max-w-[1100px]'}>
        <AfterVisitSummaryView />
      </ViewContainer>
    </CodesetStoreProvider>
  )
}

export default AfterVisitSummaryPage
