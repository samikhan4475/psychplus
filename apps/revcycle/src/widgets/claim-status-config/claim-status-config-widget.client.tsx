'use client'

import {
  AddClaimStatusDialog,
  ClaimStatusTable,
  EditClaimStatusDialog,
  ReassignClaimDialog,
} from './components'

const ClaimStatusConfigWidgetClient = () => {
  return (
    <>
      <AddClaimStatusDialog />
      <ReassignClaimDialog />
      <EditClaimStatusDialog />
      <ClaimStatusTable />
    </>
  )
}

export { ClaimStatusConfigWidgetClient }
