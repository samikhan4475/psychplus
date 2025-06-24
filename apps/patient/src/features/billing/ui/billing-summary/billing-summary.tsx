import { withSuspense } from '@psychplus-v2/utils'
import { CardContainer, LoadingPlaceholder } from '@/components-v2'
import { getPatientInsurances } from '../../payments/api'
import { InsuranceSummary } from './insurance-summary'

const BillingSummaryServer = async () => {
  const insuranceData = await getPatientInsurances()

  if (insuranceData.state === 'error') {
    throw new Error(insuranceData.error)
  }

  return (
    <CardContainer className='px-3 sm:px-8 py-4 sm:py-7'>
      {/* <PaymentSummary data={paymentDueData} /> */}
      {/* <Separator my="4" className="w-full" /> */}
      <InsuranceSummary data={insuranceData.data} />
    </CardContainer>
  )
}

const BillingSummary = withSuspense(BillingSummaryServer, {
  fallback: (
    <CardContainer>
      <LoadingPlaceholder />
    </CardContainer>
  ),
})

export { BillingSummary }
