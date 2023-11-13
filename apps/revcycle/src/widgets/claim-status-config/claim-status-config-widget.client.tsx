'use client'

import { ClaimStatusTable, EditClaimStatusDialog } from './components'

const ClaimStatusConfigWidgetClient = () => {
  return (
    <>
      <EditClaimStatusDialog />
      <ClaimStatusTable />
    </>
  )
}

export { ClaimStatusConfigWidgetClient }
