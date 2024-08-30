import { unstable_noStore as noStore } from 'next/cache'
import { getCodeSets } from '@psychplus/codeset/api.server'
import {
  getClaimsList,
  getInsurancePayersList,
  getLocations,
  getPOSCodeSets,
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
  ] = await Promise.all([
    getClaimsList(),
    getInsurancePayersList(),
    getCodeSets(),
    getLocations(),
    getPOSCodeSets(),
    getStaff(),
    getUSAStates(),
  ])
  return (
    <>
      <Preloader
        store={useStore}
        claimsList={claimsList}
        posCodeSets={posCodeSets}
        staffCodeSets={staffCodeSets}
        insurancePayersList={insurancePayersList}
        codeSets={codeSets}
        locations={locations}
        usaStates={usaStates}
      />
      <ClaimWidgetClient />
    </>
  )
}

export { ClaimWidgetServer }
