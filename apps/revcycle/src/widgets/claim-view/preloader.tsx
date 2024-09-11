'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { CodeSet, MetaDataCodeSet } from '@psychplus/codeset/types'
import { POSCodeSets } from '../coding-cpt/types'
import { ClaimStoreType } from './store'
import {
  Claim,
  InsurancePayer,
  Location,
  Staff,
  StaffDataCodeSet,
  StatesCode,
  USAStates,
  ResponseHistoryRecord
} from './types'

type BoundStoreType = UseBoundStore<StoreApi<ClaimStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  claimsList: Claim[]
  responseHistoryList: ResponseHistoryRecord[]
  insurancePayersList: InsurancePayer[]
  codeSets: CodeSet[]
  locations: Location[]
  posCodeSets: POSCodeSets
  staffCodeSets: Staff[]
  usaStates: USAStates
}

const Preloader = ({
  store,
  claimsList,
  responseHistoryList,
  insurancePayersList,
  codeSets,
  locations,
  posCodeSets,
  staffCodeSets,
  usaStates,
}: PreloaderProps) => {
  const loaded = useRef(false)
  const {
    setClaimList,
    setDateTypes,
    setLocations,
    setInsurancePayersList,
    setCodingPosCodeSets,
    setStaffCodeSets,
    setAccidentTypeCodesets,
    setUSAStatesCodeSets,
    setResponseHistoryList
  } = store((state) => ({
    setClaimList: state.setClaimList,
    setDateTypes: state.setDateTypes,
    setLocations: state.setLocations,
    setInsurancePayersList: state.setInsurancePayersList,
    setStaffCodeSets: state.setStaffCodeSets,
    setCodingPosCodeSets: state.setCodingPosCodeSets,
    setAccidentTypeCodesets: state.setAccidentTypeCodesets,
    setUSAStatesCodeSets: state.setUSAStatesCodeSets,
    setResponseHistoryList: state.setResponseHistoryList,
  }))

  if (!loaded.current) {
    loaded.current = true
    setClaimList(claimsList)
    setResponseHistoryList(responseHistoryList)

    const accidentType = codeSets.find(
      (element) => element.code === 'AccidentType',
    )

    if (accidentType) {
      const accidentTypeOptionList: MetaDataCodeSet[] = []
      for (const state of accidentType.codes) {
        accidentTypeOptionList.push({
          display: state.display,
          code: state.code,
        })
      }
      setAccidentTypeCodesets(accidentTypeOptionList)
    }
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
      contact: element.contact,
    }))

    setLocations(locationsCompiled)
    const optionsList = []
    for (const state of posCodeSets.codes) {
      const codeAttributes = state.codeAttributes ?? []
      let submissionCode = ''
      for (const attribute of codeAttributes) {
        if (attribute.name === 'SubmissionCode') {
          submissionCode = attribute.content 
          break 
        }
      }

      const formattedCode = submissionCode.padStart(2, '0');
      if (submissionCode) {
        optionsList.push({
          display: `${formattedCode}-${state.displayName}`,
          code: state.code,
        })
      } else {
        optionsList.push({
          display: state.displayName, 
          code: state.code,
        })
      }
    }
    setCodingPosCodeSets(optionsList)

    const staffDataCodeSet: StaffDataCodeSet[] = []
    for (const state of staffCodeSets) {
      staffDataCodeSet.push({
        label: state.legalName.firstName,
        value: state.id.toString(),
      })
    }
    setStaffCodeSets(staffDataCodeSet)

    if (usaStates) {
      const StatesDataSet: StatesCode[] = usaStates.codes
      const statesoptionlist = StatesDataSet.map((element) => ({
        value: element.code,
        label: element.displayName,
      }))
      setUSAStatesCodeSets(statesoptionlist)
    }
  }

  return null
}

export { Preloader }
