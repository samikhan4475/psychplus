import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { DetailsType, GroupSelectSection } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { mapCodesetToOptions } from '@/utils'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'

const BLOCK_ID = 'schizophrenia'

const BLOCK_TITLE = 'Schizophrenia'

const SCHIZOPHRENIA_BLOCK_OPTIONS = (
  DELUSION_OPTIONS: {
    label: string
    value: string
  }[],
  HALLUCINATIONS_OPTIONS: {
    label: string
    value: string
  }[],
) => [
  {
    label: 'Delusion',
    value: 'schDelusion',
    details: {
      type: 'multi-select' as DetailsType,
      hideSelectedCount: true,
      label: 'Types',
      options: DELUSION_OPTIONS,
      isOptionsChip: true,
      field: 'schizophreniaDelusionValues',
    },
  },

  {
    label: 'Hallucination',
    value: 'schHallucination',
    details: {
      type: 'multi-select' as DetailsType,
      hideSelectedCount: true,
      label: 'Types',
      options: HALLUCINATIONS_OPTIONS,
      isOptionsChip: true,
      field: 'schizophreniaHallucinationsValues',
    },
  },

  {
    label: 'Disorganized',
    value: 'schDisorganized',
  },
  {
    label: 'Anhedonia',
    value: 'schAnhedonia',
  },
  {
    label: 'Avolition',
    value: 'schAvolition',
  },

  {
    label: 'Catatonia',
    value: 'schCatatonia',
  },
  {
    label: 'Suicidal Thoughts',
    value: 'schSuicidalThoughts',
  },
  {
    label: 'Homicidal Thoughts',
    value: 'schHomicidalThoughts',
  },
]

const SchizophreniaBlock = () => {
  const { watch, setValue, getValues } = useFormContext<HpiWidgetSchemaType>()
  const schizophreniaValues = watch('schizophrenia')

  const DELUSION_OPTIONS = mapCodesetToOptions(
    useCodesetCodes(CODESETS.DelusionType),
  )

  const HALLUCINATIONS_OPTIONS = mapCodesetToOptions(
    useCodesetCodes(CODESETS.HallucinationType),
  )

  useEffect(() => {
    if (!schizophreniaValues.length) {
      setValue('schizophreniaDelusionValues', [])
      setValue('schizophreniaHallucinationsValues', [])
    }
  }, [schizophreniaValues, getValues, setValue])
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={SCHIZOPHRENIA_BLOCK_OPTIONS(
        DELUSION_OPTIONS,
        HALLUCINATIONS_OPTIONS,
      )}
      parentField="chiefComplaint"
      valueInParent="ccSchizophrenia"
    />
  )
}

export { SchizophreniaBlock }
