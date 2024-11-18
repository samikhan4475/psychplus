import React from 'react'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { TmsWidgetSchemaType } from '@/ui/procedures/tms-tab/tms-widget-schema'

const PRECAUTIONS_AND_WARNINGS = [
  {
    id: '1',
    label:
      "The patient's safety and comfort was ensured through proper positioning of TMS coil during sessions, inclusive of head circumference measurement for correct cap size and provision of hearing protection.",
  },
  {
    id: '2',
    label:
      'The patient was educated about potential adverse effects of TMS, including headaches, scalp discomfort, muscle twitching, and transient mood or cognitive changes.',
  },
  {
    id: '3',
    label:
      'The patient was screened for risk factors predisposing to seizures before treatment initiation.',
  },
  {
    id: '4',
    label:
      'The patient was screened for implanted medical devices to assess risk of TMS-induced interference.',
  },
  {
    id: '5',
    label:
      'The patient was informed of potential benefits and risks associated with TMS treatment, particularly concerning neurological conditions.',
  },
  {
    id: '6',
    label:
      "Transcranial Magnetic Stimulation (TMS) is deemed medically necessary for the patient's condition.",
  },
]

interface Props<T> {
  data: T
}
const PrecautionsSection = ({ data }: Props<TmsWidgetSchemaType>) => {
  return (
    <Flex direction={'column'}>
      <Heading size="3" className="my-2">
        Precautions & Warnings
      </Heading>
      {PRECAUTIONS_AND_WARNINGS.map(
        (item) =>
          data.precautionsAndWarnings.includes(item.id) && (
            <Flex direction={'column'} key={item.id} className="mb-2">
              <Text className="text-1 font-medium">{item.label}</Text>
              <Text className="text-1 font-medium">Checked</Text>
            </Flex>
          ),
      )}
    </Flex>
  )
}

export { PrecautionsSection }
