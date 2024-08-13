'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { CodeSet, MetaDataCodeSet } from '@psychplus/codeset/types'
import { ClaimStoreType } from './store'
import { Claim, InsurancePayer, Location } from './types'

type BoundStoreType = UseBoundStore<StoreApi<ClaimStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  claimsList: Claim[]
  insurancePayersList: InsurancePayer[]
  codeSets: CodeSet[]
  locations: Location[]
}

const Preloader = ({
  store,
  claimsList,
  insurancePayersList,
  codeSets,
  locations,
}: PreloaderProps) => {
  const loaded = useRef(false)
  const { setClaimList, setDateTypes, setLocations, setInsurancePayersList } =
    store((state) => ({
      setClaimList: state.setClaimList,
      setDateTypes: state.setDateTypes,
      setLocations: state.setLocations,
      setInsurancePayersList: state.setInsurancePayersList,
    }))

  if (!loaded.current) {
    loaded.current = true
    setClaimList(claimsList)

    const codeSetObj: CodeSet = codeSets.find((element) => {
      return element.code === 'ClaimFiltrationDateType'
    }) as CodeSet

    const PlaceOfService: MetaDataCodeSet[] = codeSetObj.codes

    const compiled = PlaceOfService.map((element) => ({
      value: element.code,
      label: element.display,
    }))
    setDateTypes(compiled)

    const insurancePayerCompiled = insurancePayersList.map((element) => ({
      value: element.id,
      label: element.name,
    }))

    setInsurancePayersList(insurancePayerCompiled)

    const locationsCompiled = locations.map((element) => ({
      value: element.id,
      label: element.name,
    }))

    setLocations(locationsCompiled)
  }

  return null
}

export { Preloader }
