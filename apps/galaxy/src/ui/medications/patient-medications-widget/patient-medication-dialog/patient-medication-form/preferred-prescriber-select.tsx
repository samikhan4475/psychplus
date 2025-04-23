'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { SelectOptionType } from '@/types'
import { searchPharmaciesAction } from '../../actions'
import { PrescribedStatus } from '../../types'
import { PatientMedicationSchemaType } from './schema'
import { SearchPharmacyButton } from './search-pharmacy-button'

const PreferredPrescriberSelect = () => {
  const form = useFormContext<PatientMedicationSchemaType>()
  const prescribedStatus = form.watch('prescribedStatus')
  const { id } = useParams<{ id: string }>()
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)

  const getPharmaciesAction = useCallback(
    () => searchPharmaciesAction(id, { isOnlyDefaults: false }),
    [id],
  )
  const handleAddOption = (option: SelectOptionType) => {
    setOptions([...options, option])
  }

  useEffect(() => {
    if (PrescribedStatus.Pharmacy !== prescribedStatus) return
    setLoading(true)
    getPharmaciesAction()
      .then((res) => {
        if (res?.state === 'error') {
          return toast.error(res?.error)
        }
        setOptions(res?.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [getPharmaciesAction, prescribedStatus])

  if (PrescribedStatus.Pharmacy !== prescribedStatus) return null
  return (
    <Flex align="start" gap="1" className="flex-1">
      <FormFieldContainer className="flex-1">
        <FormFieldLabel required>Preferred Pharmacy</FormFieldLabel>
        <DropdownSelect
          field="pharmacyNcpdpId"
          className="max-w-[136px]"
          options={options}
          loading={loading}
        />
        <FormFieldError name="pharmacyNcpdpId" />
      </FormFieldContainer>
      <SearchPharmacyButton onSelect={handleAddOption} disabled={loading} />
    </Flex>
  )
}

export { PreferredPrescriberSelect }
