'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, CheckboxCell } from '@/components'

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

const PrecautionAndWarning = () => {
  const form = useFormContext()

  const selectedIds: string[] = form.watch('precautionsAndWarnings')
  const toggleSelected = (value: string) => {
    const index = selectedIds.indexOf(value)

    const newSelectedIds =
      index === -1
        ? [...selectedIds, value]
        : selectedIds.filter((id) => id !== value)
    form.setValue('precautionsAndWarnings', [...newSelectedIds])
  }

  return (
    <Flex direction="column" gap="1">
      <BlockLabel className="text-2 font-[600]">
        Precautions & Warnings
      </BlockLabel>

      {PRECAUTIONS_AND_WARNINGS.map((item) => (
        <CheckboxCell
          key={item.id}
          label={item.label}
          checked={selectedIds.includes(item.id)}
          onCheckedChange={() => toggleSelected(item.id)}
        />
      ))}
    </Flex>
  )
}

export { PrecautionAndWarning }
