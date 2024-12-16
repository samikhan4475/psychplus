'use client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { SelectSearchable } from '@/components'
import { useStore } from '../../store'
import { AddOnWidgetSchemaType } from '../add-on-widget-schema'

const DRUG_NAME_KEY = 'drugName'

const SearchDrugsBlock = () => {
  const form = useFormContext<AddOnWidgetSchemaType>()
  const { loading, fetchDrugs, drugsData, setSelectedDrug } = useStore(
    (state) => ({
      fetchDrugs: state.fetchDrugs,
      loading: state.loading,
      drugsData: state.drugsData,
      setSelectedDrug: state.setSelectedDrug,
    }),
  )
  const selectedDrug = form.watch(DRUG_NAME_KEY) as string

  useEffect(() => {
    fetchDrugs('', selectedDrug)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SelectSearchable
      label="Drug Name"
      required
      loading={loading}
      data={drugsData}
      field={DRUG_NAME_KEY}
      handleSearch={fetchDrugs}
      handleItemSelect={setSelectedDrug}
      defaultValue={selectedDrug}
    />
  )
}

export { SearchDrugsBlock }
