import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { MultiSelectField } from '@/components'
import { SelectOptionType } from '@/types'
import { searchLocationOptionsAction } from '../../client-actions'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { CalenderViewSchemaType } from '../../types'

const LocationDropdown = () => {
  const form = useFormContext<CalenderViewSchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [clinicLocations, setClinicLocations] = useState<SelectOptionType[]>([])
  const stateIds = form.watch('stateIds')
  const locationIds = form.watch('locationIds')

  useEffect(() => {
    if (stateIds.length) {
      setLoading(true)
      searchLocationOptionsAction({ stateId: stateIds }).then((response) => {
        setLoading(false)
        if (response.state === 'error') {
          toast.error(
            response.error ? response.error : 'Failed to fetch clinic location',
          )
        }
        setClinicLocations(response.state === 'error' ? [] : response.data)
      })
    }
  }, [stateIds])

  return (
    <FormFieldContainer>
      <FieldLabel>Location</FieldLabel>
      <MultiSelectField
        disabled={!stateIds.length}
        defaultValues={locationIds}
        options={clinicLocations}
        className="flex-1"
        onChange={(values) => {
          form.setValue('locationIds', values, { shouldDirty: true })
          form.setValue('serviceIds', [])
        }}
        menuClassName="w-[155px]"
        loading={loading}
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
