import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getPracticeOptionsAction } from '../../actions'
import { SchemaType } from './schema'

const PracticeSelect = () => {
  const form = useFormContext<SchemaType>()
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(true)
  const organizationId = form.getValues('organizationIds')[0] ?? ''

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const response = await getPracticeOptionsAction({
        payload: {
          organizationId,
        },
      })
      if (response.state === 'success') {
        setOptions(response.data)
      }
      setLoading(false)
    })()
  }, [organizationId])

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Practice</FormFieldLabel>
      <SelectInput
        disabled={loading}
        field="practiceIds.[0]"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        options={options}
        loading={loading}
      />
      <FormFieldError name="practiceIds.[0]" />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
