'use client'

import { ClearingHouse } from './components'

const ClearingHouseWidgetClient = ({
  googleApiKey,
}: {
  googleApiKey: string
}) => {
  return <ClearingHouse googleApiKey={googleApiKey} />
}

export { ClearingHouseWidgetClient }
