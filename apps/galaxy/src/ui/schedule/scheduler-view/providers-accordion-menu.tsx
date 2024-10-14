'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { Grid, Text } from '@radix-ui/themes'
import { AccordionItem } from './accordion-item'
import { useStore } from './store'

const ProvidersAccordionMenu = () => {
  const appointmentAvailabilities = useStore((state) => state.data)

  return (
    <Accordion.Root type="multiple">
      {appointmentAvailabilities.length ? (
        appointmentAvailabilities.map((providerAvailability) => (
          <AccordionItem
            key={providerAvailability.specialist.id}
            provider={providerAvailability}
            value={`${providerAvailability.specialist.id}`}
          />
        ))
      ) : (
        <Grid columns="16" className="mx-[26px]">
          <Text
            align="center"
            className="border-pp-focus-bg col-[3_/_span_14] border-b border-l border-r py-2 text-[12px]"
          >
            No results found
          </Text>
        </Grid>
      )}
    </Accordion.Root>
  )
}

export { ProvidersAccordionMenu }
