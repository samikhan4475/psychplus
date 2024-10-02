import { unstable_noStore as noStore } from 'next/cache'
import { getCodeSets } from '@psychplus/codeset/api.server'
import { ToastProvider } from '@psychplus/ui/toast-provider'
import {
  getClaimPaymentFiltrationDateTypeCodeSets,
  getClaimsList,
  getClaimSubmissionHistoryList,
  getInsurancePayersList,
  getInsurancePaymentsList,
  getLocations,
  getPaymentMethodCodeSets,
  getPaymentSourceTypeCodeSets,
  getPOSCodeSets,
  getPracticeList,
  getResponseHistory,
  getStaff,
  getUSAStates,
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
    posCodeSets,
    staffCodeSets,
    usaStates,
    claimSubmissionHistoryList,
    insurancePaymentsList,
    paymentMethodCodeSets,
    responseHistory,
    paymentSourceTypeCodeSets,
    claimPaymentFiltrationDateTypeCodeSets,
    practiceList,
  ] = await Promise.all([
    getClaimsList(),
    getInsurancePayersList(),
    getCodeSets(),
    getLocations(),
    getPOSCodeSets(),
    getStaff(),
    getUSAStates(),
    getClaimSubmissionHistoryList(),
    getInsurancePaymentsList(),
    getPaymentMethodCodeSets(),
    getResponseHistory(),
    getPaymentSourceTypeCodeSets(),
    getClaimPaymentFiltrationDateTypeCodeSets(),
    getPracticeList(),
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
        insurancePaymentsList={insurancePaymentsList}
        paymentMethodCodeSets={paymentMethodCodeSets}
        responseHistoryList={responseHistory}
        paymentSourceTypeCodeSets={paymentSourceTypeCodeSets}
        claimPaymentFiltrationDateTypeCodeSets={
          claimPaymentFiltrationDateTypeCodeSets
        }
        practiceList={practiceList}
      />
      <ClaimWidgetClient />
    </ToastProvider>
  )
}

export { ClaimWidgetServer }
