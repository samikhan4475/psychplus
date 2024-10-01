'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { AccordionItem } from './accordion-item'
import { useStore } from './store'

const ProvidersAccordionMenu = () => {
  const appointmentAvailabilities = useStore((state) => state.data)

  return (
    <Accordion.Root type="multiple">
      {appointmentAvailabilities.map((providerAvailability) => (
        <AccordionItem
          key={providerAvailability.specialist.id}
          provider={providerAvailability}
          value={`${providerAvailability.specialist.id}`}
        />
      ))}
    </Accordion.Root>
  )
}

export { ProvidersAccordionMenu }
