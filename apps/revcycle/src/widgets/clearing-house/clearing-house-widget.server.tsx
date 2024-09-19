import { unstable_noStore as noStore } from 'next/cache'
import { GOOGLE_MAPS_API_KEY } from '@psychplus/utils/constants'
import {
  getClearingHouseReceiversData,
  getEDIData,
  getInsurancePayerData,
  getUsStatesCodeSets,
} from './api.server'
import { ClearingHouseWidgetClient } from './clearing-house-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

const ClearingHouseWidgetServer = async () => {
  noStore()
  const [
    clearingHouseReceiverList,
    insurancePayerList,
    usStatesCodeSet,
    ediRecords,
  ] = await Promise.all([
    getClearingHouseReceiversData(),
    getInsurancePayerData(),
    getUsStatesCodeSets(),
    getEDIData(),
  ])

  return (
    <>
      <Preloader
        store={useStore}
        usStatesCodeSet={usStatesCodeSet}
        clearingHouseReceiverList={clearingHouseReceiverList}
        insurancePayerList={insurancePayerList}
        ediRecords={ediRecords}
      />
      <ClearingHouseWidgetClient googleApiKey={GOOGLE_MAPS_API_KEY ?? ''} />
    </>
  )
}

export { ClearingHouseWidgetServer }
