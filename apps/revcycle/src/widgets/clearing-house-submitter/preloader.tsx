'use client'

import { useEffect } from 'react'
import { StoreApi, UseBoundStore } from 'zustand'
import { getClearingHouseReceiversData, getClearingHouseSubmitterPracticeList, getUsCitiesCodeSets, getUsStatesCodeSets } from './api.client'
import { type SubmitterType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<SubmitterType>>
interface PreloaderProps {
  store: BoundStoreType
}

const Preloader = ({
  store,
}: PreloaderProps) => {

  const { setStateList, setCitiesList, setPracticeList, setReceiverList } = store(state => ({
    setStateList: state.setStateList,
    setCitiesList: state.setCitiesList,
    setPracticeList: state.setPracticeList,
    setReceiverList: state.setReceiverList,
  }));

  useEffect(() => {
    const fetchData = async () => {
      const stateCodeResponse = await getUsStatesCodeSets();
      const citiesCodeResponse = await getUsCitiesCodeSets();
      const practiceList = await getClearingHouseSubmitterPracticeList();
      const receiverList = await getClearingHouseReceiversData();
      setStateList(stateCodeResponse);
      setCitiesList(citiesCodeResponse);
      setPracticeList(practiceList);
      setReceiverList(receiverList);
    }
    fetchData().catch((error) => {
      console.error('An error occurred while fetching the data: ', error)
    }
    )
  }, []);

  return null;
}

export { Preloader }
