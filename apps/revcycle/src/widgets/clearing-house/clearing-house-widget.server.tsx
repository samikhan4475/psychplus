import { unstable_noStore as noStore } from 'next/cache'
import { ClearingHouseWidgetClient } from './clearing-house-widget.client'

const ClearingHouseWidgetServer = () => {
    noStore()

    return <ClearingHouseWidgetClient />
}

export { ClearingHouseWidgetServer }
