import { useMemo } from 'react'
import { FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { FilterFieldContainer } from '../../shared'

const timeDependentAttributeName = 'IsTimeDependent'
const ServiceSelect = () => {
  const serviceCodes = useCodesetCodes(CODESETS.ServicesOffered).filter(
    (code) =>
      code.value !== 'NotSet' &&
      code.attributes?.find(
        (att) =>
          att.name === timeDependentAttributeName && att.value === 'True',
      ),
  )
  const options = useMemo(
    () =>
      serviceCodes.map((service) => ({
        value: service.value,
        label: service.display,
      })),
    [],
  )

  return (
    <FilterFieldContainer>
      <FormFieldLabel>Service</FormFieldLabel>
      <SelectInput
        placeholder="Select Type"
        className="flex-1"
        buttonClassName="w-full h-6"
        field="servicesOffered"
        options={options}
      />
    </FilterFieldContainer>
  )
}

export { ServiceSelect }
