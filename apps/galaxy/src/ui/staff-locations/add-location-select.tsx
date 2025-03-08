import React from 'react'
import { useParams } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { AsyncRowSelect } from '@/components/async-row-select'
import { SelectOptionType } from '@/types'
import { getStateLocationAction } from './actions'
import { createPrescriberDirectoryAction } from './actions/create-prescriber-directory'
import { createProviderLocationAction } from './actions/create-provider-location'
import { SchemaType } from './staff-location-filters'
import { useStore } from './store'

const AddLocationSelect = () => {
  const { search, sureScriptEnabled } = useStore((state) => ({
    search: state.search,
    sureScriptEnabled: state.sureScriptEnabled,
  }))

  const form = useFormContext<SchemaType>()
  const stateName = form.watch('stateName')
  const { id } = useParams()
  const onOptionClick = async (option: SelectOptionType) => {
    if (id && typeof id === 'string') {
      const result = await createProviderLocationAction({
        staffId: id,
        locationId: option.value,
      })

      if (result.state === 'success') {
        toast.success('Location Added Successfully')

        if (sureScriptEnabled) {
          const prescriberResult = await createPrescriberDirectoryAction({
            staffId: id,
            locationId: option.value,
          })

          if (prescriberResult.state === 'success') {
            toast.success('Prescriber Added successfully')
          } else if (prescriberResult.state === 'error') {
            toast.error(prescriberResult.error)
          }
        }
      } else if (result.state === 'error') {
        toast.error(result.error)
      }

      search({ staffId: id }, 1, true)
    }
  }
  return (
    <FormFieldContainer className="flex-row gap-x-2">
      <FormFieldLabel>Select & Add Location</FormFieldLabel>
      <AsyncRowSelect
        size="1"
        className="w-[280px]"
        allowMultiple
        label="Select Location"
        disabled={!stateName}
        onRowClick={onOptionClick}
        fetchOptions={getStateLocationAction}
      />
    </FormFieldContainer>
  )
}

export { AddLocationSelect }
