'use client'

import { useCallback } from 'react'
import {
  AsyncSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { ActionResult } from '@/types'
import { getLabsLocation } from '../add-lab-order/api'
import { LabsLocation } from '../add-lab-order/blocks/types'

interface Options {
  label: string
  value: string
}
const LocationSelect = () => {
  const fetchOptions: () => Promise<ActionResult<Options[]>> =
    useCallback(async () => {
      const response = await getLabsLocation({
        recordStatuses: ['Active'],
      })
      if (response.state === 'success') {
        const dropdownValues = response.data.map((item: LabsLocation) => ({
          label: item.name ?? '',
          value: item.name?.toLowerCase() ?? '',
        }))
        return Promise.resolve({
          state: 'success',
          data: dropdownValues ?? [],
        })
      }
      return Promise.resolve({ state: 'success', data: [] })
    }, [])
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Lab Location</FormFieldLabel>
      <AsyncSelect
        field="orderingLab"
        fetchOptions={fetchOptions}
        buttonClassName="w-[101px] h-6"
      />
    </FormFieldContainer>
  )
}
export { LocationSelect }
