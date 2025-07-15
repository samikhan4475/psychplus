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
  const pharmacyNcpdpId = form.watch('pharmacyNcpdpId')
  const prescriptionPharmacyName = form.watch('prescriptionPharmacyName')
  const pharmacyId = form.watch('pharmacyId')
  const { id } = useParams<{ id: string }>()
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)

  const getPharmaciesAction = useCallback(
    () => searchPharmaciesAction(id, { isOnlyDefaults: false }),
    [id],
  )
  const handleAddOption = (option: SelectOptionType) => {
    const existingOption = options.find((opt) => opt.value === option.value)
    if (!existingOption) {
      setOptions((prevOptions) => [...prevOptions, option])
    }
    form.setValue('prescriptionPharmacyName', option.label)
    form.setValue('pharmacyNcpdpId', option.ncpdpId || undefined)
  }

  useEffect(() => {
    if (pharmacyNcpdpId && prescriptionPharmacyName && pharmacyId) {
      const existingOption = options.find((opt) => opt.value === pharmacyId)
      if (!existingOption) {
        const newOption: SelectOptionType = {
          value: pharmacyId,
          label: prescriptionPharmacyName,
          ncpdpId: pharmacyNcpdpId,
        }
        setOptions((prevOptions) => [...prevOptions, newOption])
        form.setValue('pharmacyId', pharmacyId)
      }
    }
  }, [pharmacyNcpdpId, prescriptionPharmacyName, pharmacyId, options, form])

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

  useEffect(() => {
    if (options.length > 0 && !form.watch('pharmacyId')) {
      const first = options[0]
      form.setValue('pharmacyId', first.value)
      if (first.externalPharmacyId) {
        form.setValue('pharmacyNcpdpId', first.externalPharmacyId)
      }
      form.setValue('prescriptionPharmacyName', first.label)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])
  if (PrescribedStatus.Pharmacy !== prescribedStatus) return null
  return (
    <Flex align="start" gap="1" className="flex-1">
      <FormFieldContainer className="flex-1">
        <FormFieldLabel required>Preferred Pharmacy</FormFieldLabel>
        <DropdownSelect
          field="pharmacyId"
          className="max-w-[136px]"
          options={options}
          loading={loading}
        />
        <FormFieldError name="pharmacyId" />
      </FormFieldContainer>
      <SearchPharmacyButton onSelect={handleAddOption} disabled={loading} />
    </Flex>
  )
}

export { PreferredPrescriberSelect }
