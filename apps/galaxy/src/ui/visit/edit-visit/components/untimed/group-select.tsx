'use client'

import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { getUnitsGroupsAction } from '@/ui/visit/actions/get-units-groups'
import { SchemaType } from '../../schema'

const GroupSelect = () => {
  const form = useFormContext<SchemaType>()
  const [groups, setGroups] = useState<{ label: string; value: string }[]>([])

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
      setGroups(res.data)
    })
  }, [serviceId])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Group</FormFieldLabel>
      <SelectInput options={groups} field="group" buttonClassName="flex-1" />
    </FormFieldContainer>
  )
}

export { GroupSelect }
