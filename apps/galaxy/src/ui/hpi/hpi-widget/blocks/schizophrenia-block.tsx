import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { DetailsType, GroupSelectSection } from '@/components'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'

const BLOCK_ID = 'schizophrenia'

const BLOCK_TITLE = 'Schizophrenia'

const DELUSION_OPTIONS = [
  { label: 'Grandiose', value: 'grandiose' },
  { label: 'of reference', value: 'ofReference' },
  { label: 'Erotomania', value: 'erotomania' },
  { label: 'Persecutory', value: 'persecutory' },
  { label: 'Jealous', value: 'jealous' },
  { label: 'Bizarre', value: 'bizarre' },
  { label: 'Mixed', value: 'mixed' },
  { label: 'Nihilistic', value: 'nihilistic' },
  { label: 'Thought broadcasting', value: 'thoughtBroadcasting' },
  { label: 'Guilt', value: 'guilt' },
  { label: 'Thought Insertion', value: 'thoughtInsertion' },
  { label: 'Persecution', value: 'persecution' },
  { label: 'Unspecified', value: 'unspecified' },
  { label: 'Infidelity', value: 'infidelity' },
  { label: 'misidentification syndrome', value: 'misidentificationSyndrome' },
]

const HALLUCINATIONS_OPTIONS = [
  { label: 'Auditory', value: 'auditory' },
  { label: 'Visual', value: 'visual' },
  { label: 'Olfactory', value: 'Olfactory' },
  { label: 'Tactile', value: 'tactile' },
  { label: 'Gustatory', value: 'gustatory' },
  { label: 'Somatic', value: 'Somatic' },
]

const SCHIZOPHRENIA_BLOCK_OPTIONS = [
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
      options={SCHIZOPHRENIA_BLOCK_OPTIONS}
      parentField="chiefComplaint"
      valueInParent="ccSchizophrenia"
    />
  )
}

export { SchizophreniaBlock }
