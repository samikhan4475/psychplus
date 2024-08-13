import { unstable_noStore as noStore } from 'next/cache'
import { getCodeSets } from '@psychplus/codeset/api.server'
import {
  getClaimsList,
  getInsurancePayersList,
  getLocations,
} from './api.server'
import { ClaimWidgetClient } from './claim-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

const ClaimWidgetServer = async () => {
  noStore()

  const [claimsList, insurancePayersList, codeSets, locations] =
    await Promise.all([
      getClaimsList(),
      getInsurancePayersList(),
      getCodeSets(),
      getLocations(),
    ])

  return (
    <>
      <Preloader
        store={useStore}
        claimsList={claimsList}
        insurancePayersList={insurancePayersList}
        codeSets={codeSets}
        locations={locations}
      />
      <ClaimWidgetClient />
    </>
  )
}

export { ClaimWidgetServer }
