'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getVisitTypesAction } from '@/ui/location/service/actions'

const VisitTypeSelect = () => {
  const [loading, setLoading] = useState(false)
  const form = useFormContext()
  const service = form.watch('service')
  const [visitTypes, setVisitTypes] = useState<SelectOptionType[]>([])

  useEffect(() => {
    if (service) {
      setLoading(true)
      setVisitTypes([])
      getVisitTypesAction(service).then((res) => {
        if (res.state === 'error') {
          setVisitTypes([])
          return toast.error(res.error || 'Failed to fetch visit types')
        }
        const visitTypesList: SelectOptionType[] = res.data.map((item) => ({
          label: item.encounterName,
          value: `${item.id}`,
        }))
        setVisitTypes(visitTypesList)
        setLoading(false)
      })
    }
  }, [service])
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1">Visit Type</FormFieldLabel>
      <SelectInput
        field="visitTypeId"
        size="1"
        options={visitTypes}
        loading={loading}
        disabled={!service}
        buttonClassName="w-full border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="service" />
    </FormFieldContainer>
  )
}

export { VisitTypeSelect }
