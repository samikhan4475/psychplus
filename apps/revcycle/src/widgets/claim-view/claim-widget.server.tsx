import { unstable_noStore as noStore } from 'next/cache'
import { getCodeSets } from '@psychplus/codeset/api.server'
import { ToastProvider } from '@psychplus/ui/toast-provider'
import {
  getClaimsList,
  getClaimSubmissionHistoryList,
  getInsurancePayersList,
  getLocations,
  getPOSCodeSets,
  getStaff,
  getUSAStates,
  getResponseHistory,
} from './api.server'
import { ClaimWidgetClient } from './claim-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

const ClaimWidgetServer = async () => {
  noStore()

  const [
    claimsList,
    insurancePayersList,
    codeSets,
    locations,
    claimSubmissionHistoryList,
    posCodeSets,
    staffCodeSets,
    usaStates,
    responseHistory
  ] = await Promise.all([
    getClaimsList(),
    getInsurancePayersList(),
    getCodeSets(),
    getLocations(),
    getClaimSubmissionHistoryList(),
    getPOSCodeSets(),
    getStaff(),
    getUSAStates(),
    getResponseHistory()
  ])
  
  return (
    <ToastProvider>
      <Preloader
        store={useStore}
        claimsList={claimsList}
        posCodeSets={posCodeSets}
        staffCodeSets={staffCodeSets}
        insurancePayersList={insurancePayersList}
        codeSets={codeSets}
        locations={locations}
        claimSubmissionHistoryList={claimSubmissionHistoryList}
        usaStates={usaStates}
        responseHistoryList={responseHistory}
      />
      <ClaimWidgetClient />
    </ToastProvider>
  )
}

export { ClaimWidgetServer }
