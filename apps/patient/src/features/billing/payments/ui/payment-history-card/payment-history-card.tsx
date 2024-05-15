import { FeatureCard } from '@/components-v2'
import { PaymentHistoryItem } from '../../types'
import { PaymentHistoryTable } from './payment-history-table'

const PaymentHistoryCard = ({
  paymentHistory,
}: {
  paymentHistory: PaymentHistoryItem[]
}) => {
  return (
    <FeatureCard title="Payment History" contentClassName="p-0">
      <PaymentHistoryTable
        data={paymentHistory}
        headerClassName="bg-transparent"
      />
    </FeatureCard>
  )
}

export { PaymentHistoryCard }
