import { PreferTable } from './components'

const PreferredFeeSchedulesWidgetServer = ({ payerId }: { payerId: string }) => (
  <PreferTable payerId={payerId} />
)

export { PreferredFeeSchedulesWidgetServer }
