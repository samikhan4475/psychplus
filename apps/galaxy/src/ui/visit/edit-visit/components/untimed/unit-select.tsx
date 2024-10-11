'use client'

import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { getUnitsGroupsAction } from '@/ui/visit/actions/get-units-groups'
import { SchemaType } from '../../schema'

const UnitSelect = () => {
  const form = useFormContext<SchemaType>()
  const [units, setUnits] = useState<{ label: string; value: string }[]>([])

  const serviceId = useWatch({
    control: form.control,
    name: 'service',
  })

  useEffect(() => {
    if (!serviceId) return
    getUnitsGroupsAction({ serviceId, isUnit: true }).then((res) => {
      if (res.state === 'error') {
        toast.error(res.error)
        return
      }
      setUnits(res.data)
    })
  }, [serviceId])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Unit</FormFieldLabel>
      <SelectInput options={units} field="unit" buttonClassName="flex-1" />
    </FormFieldContainer>
  )
}

export { UnitSelect }
