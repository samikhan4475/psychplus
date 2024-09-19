'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import {
  EDIItem,
  InsurancePayer,
  ReceiverItem,
} from './clearing-house-insurance-plan-edi/components/types'
import { ClearingHouseStoreType } from './store'
import { RaceAndEthnicityCodeSet, StatesOption } from './types'

type BoundStoreType = UseBoundStore<StoreApi<ClearingHouseStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  usStatesCodeSet: RaceAndEthnicityCodeSet
  insurancePayerList: InsurancePayer[]
  clearingHouseReceiverList: ReceiverItem[]
  ediRecords: EDIItem[]
}

const Preloader = ({
  store,
  usStatesCodeSet,
  insurancePayerList,
  clearingHouseReceiverList,
  ediRecords,
}: PreloaderProps) => {
  const loaded = useRef(false)
  const {
    setUsStatesCodeSet,
    setInsurancePayerList,
    setReceiverList,
    setEDIRecords,
    setInsurancePayerOptions,
    setReceiverOptions,
  } = store((state) => ({
    setUsStatesCodeSet: state.setUsStatesCodeSets,
    setInsurancePayerList: state.setInsurancePayerList,
    setReceiverList: state.setReceiverList,
    setEDIRecords: state.setEDIRecords,
    setInsurancePayerOptions: state.setInsurancePayerOptions,
    setReceiverOptions: state.setReceiverOptions,
  }))

  if (!loaded.current) {
    loaded.current = true

    const optionsList: StatesOption[] = []
    for (let index = 0; index < usStatesCodeSet.codes.length; index++) {
      const state = usStatesCodeSet.codes[index]
      optionsList.push({ value: state.displayName, label: state.displayName })
    }
    setUsStatesCodeSet(optionsList)
    setInsurancePayerList(insurancePayerList)
    setReceiverList(clearingHouseReceiverList)
    setEDIRecords(ediRecords)
    const transformedInsurancePayerList = insurancePayerList?.flatMap((item: InsurancePayer) =>
      item?.plans?.map((plan) => ({
        insurancePlanId: plan.id,
        insurancePayerName: plan.name,
      })),
    )

    const transformedReceiverList = clearingHouseReceiverList?.map((item: ReceiverItem) => ({
      receiverId: item.id,
      receiverName: item.receiverName,
      city: item.city,
      state: item.state,
    }))

    setInsurancePayerOptions(transformedInsurancePayerList)
    setReceiverOptions(transformedReceiverList)
  }

  return null
}

export { Preloader }

