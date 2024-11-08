'use client'

import { useEffect } from 'react'
import { SelectSearchable } from '@/components'
import { useStore } from '../../store'

const SearchDrugsBlock = () => {
  const { loading, fetchDrugs, drugsData, setSelectedDrug } = useStore(
    (state) => ({
      fetchDrugs: state.fetchDrugs,
      loading: state.loading,
      drugsData: state.drugsData,
      setSelectedDrug: state.setSelectedDrug,
    }),
  )

  const handleSearchDrugs = (value: string) => {
    fetchDrugs(value)
  }

  useEffect(() => {
    fetchDrugs('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SelectSearchable
      label="Drug Name"
      required
      loading={loading}
      data={drugsData}
      field="drugName"
      handleSearch={handleSearchDrugs}
      handleItemSelect={(item) => setSelectedDrug(item)}
    />
  )
}

export { SearchDrugsBlock }
