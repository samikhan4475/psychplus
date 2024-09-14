import * as Accordion from '@radix-ui/react-accordion'
import { useStore } from '../../store'
import { AccordionItem } from './accordian-item'

const ProvidersAccordionMenu = () => {
  const appointmentAvailabilities = useStore(
    (state) => state.appointmentAvailabilities
  )

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
