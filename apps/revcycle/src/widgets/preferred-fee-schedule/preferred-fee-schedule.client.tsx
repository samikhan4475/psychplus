'use client'

import { PreferTable } from './components'

const PreferredFeeSchedulesWidgetClient = ({ payerId }: { payerId: string }) => (
  <PreferTable payerId={payerId} />
)

export { PreferredFeeSchedulesWidgetClient }
