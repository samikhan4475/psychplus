'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { Grid, Text } from '@radix-ui/themes'
import { NewPatient } from '@/types'
import { AccordionItem } from './accordion-item'
import { useStore } from './store'

const ProvidersAccordionMenu = ({
  onVisitAdd,
  patient,
  isFollowup,
  consultationDate,
}: {
  onVisitAdd?: () => void
  patient: undefined | NewPatient
  isFollowup: boolean,
  consultationDate?: string
}) => {
  const appointmentAvailabilities = useStore((state) => state.data)

  return (
    <Accordion.Root type="multiple">
      {appointmentAvailabilities.length ? (
        appointmentAvailabilities.map((providerAvailability) => (
          <AccordionItem
            key={`${providerAvailability.specialist.id}-${providerAvailability.clinic.id}`}
            provider={providerAvailability}
            value={`${providerAvailability.specialist.id}-${providerAvailability.clinic.id}`}
            patient={patient}
            onVisitAdd={onVisitAdd}
            isFollowup={isFollowup}
            consultationDate={consultationDate}
          />
        ))
      ) : (
        <Grid columns="16" className="px-2.5">
          <Text
            align="center"
            className="border-pp-focus-bg col-[3_/_span_14] border-b border-l border-r py-2 text-[12px]"
          >
            No results
          </Text>
        </Grid>
      )}
    </Accordion.Root>
  )
}

export { ProvidersAccordionMenu }
