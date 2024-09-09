import { BillingHistoryView } from '@/ui/billing-history'

interface BillingHistoryPageProps {
  params: {
    id: string
  }
}

const BillingHistoryPage = ({ params }: BillingHistoryPageProps) => {
  return <BillingHistoryView patientId={params.id} />
}

export default BillingHistoryPage
