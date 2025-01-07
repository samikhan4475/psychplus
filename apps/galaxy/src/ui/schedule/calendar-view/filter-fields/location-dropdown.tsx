import { useFormContext } from 'react-hook-form'
import { AsyncSelect } from '@/components'
import { getStateClinicsOptionsAction } from '../../actions'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { CalenderViewSchemaType } from '../../types'

const LocationDropdown = () => {
  const form = useFormContext<CalenderViewSchemaType>()
  const stateId = form.watch('stateIds')

  return (
    <FormFieldContainer>
      <FieldLabel>Location</FieldLabel>
      <AsyncSelect
        field="locationId"
        placeholder="Select"
        disabled={!stateId}
        fetchOptions={() => getStateClinicsOptionsAction(stateId ?? '')}
        buttonClassName="flex-1 h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
