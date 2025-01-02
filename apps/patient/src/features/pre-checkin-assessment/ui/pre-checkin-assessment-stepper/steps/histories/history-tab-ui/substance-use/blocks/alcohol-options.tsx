import React from 'react'
import { Flex } from '@radix-ui/themes'
import { SingleSelectChip } from '../../components/single-select-chip'

const DRUG_DETAILS_OPTIONS = [
  {
    label: 'Opioids',
    field: 'opioids',
    detailsField: 'opioidsDetails',
  },
  {
    label: 'Sedative',
    field: 'sedative',
    detailsField: 'sedativeDetails',
  },
  {
    label: 'Cocaine',
    field: 'cocaine',
    detailsField: 'cocaineDetails',
  },
  {
    label: 'Amphetamine',
    field: 'amphetamine',
    detailsField: 'amphetamineDetails',
  },
  {
    label: 'PCP',
    field: 'pcp',
    detailsField: 'pcpDetails',
  },
  {
    label: 'Inhalants',
    field: 'inhalants',
    detailsField: 'inhalantsDetails',
  },
]

const AlcoholOptions = () => {
  return (
    <Flex direction="column" gap="2" mt={'2'}>
      <Flex align="center" gap="2" wrap="wrap">
        {DRUG_DETAILS_OPTIONS.map((option) => (
          <SingleSelectChip
            key={option.field}
            label={option.label}
            field={option.field}
            details={{
              type: 'text',
              label: 'Details',
              field: option.detailsField,
            }}
          />
        ))}
      </Flex>
    </Flex>
  )
}

export default AlcoholOptions
