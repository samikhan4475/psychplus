import { useFieldArray, useFormContext } from 'react-hook-form'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import * as MultiSelectPopover from './multiselect-popover'
import { SchemaType } from './schema'

const AddServicePopover = () => {
  const serviceCodes = useCodesetCodes(CODESETS.ServicesOffered).filter(
    (code) => code.value !== 'NotSet',
  )
  const services = Array.from(serviceCodes, (code) => ({
    service: code.display,
    bookingFrequency: '',
  }))
  const { watch } = useFormContext<SchemaType>()
  const { append } = useFieldArray({
    name: 'services',
  })

  const servicesAdded = watch('services')

  const isServiceAdded = (value: string) =>
    !!servicesAdded.find((service) => service.service === value)

  return (
    <MultiSelectPopover.Root>
      <MultiSelectPopover.Placeholder>
        Select Services
      </MultiSelectPopover.Placeholder>
      <MultiSelectPopover.List>
        {services.map((service) => (
          <MultiSelectPopover.Item
            key={service.service}
            display={service.service}
            disabled={!!isServiceAdded(service.service)}
            onSelect={() =>
              isServiceAdded(service.service) ? undefined : append(service)
            }
          />
        ))}
      </MultiSelectPopover.List>
    </MultiSelectPopover.Root>
  )
}

export { AddServicePopover }
