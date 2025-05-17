'use client'

import { useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { BlockLabel, FormFieldError, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { PropsWithIndex } from './types'

const SeverityField = ({ index }: PropsWithIndex) => {
  const codes = useCodesetCodes(CODESETS.AllergySeverity)
  const options = useMemo(
    () =>
      codes.map((code) => ({
        value: code.value,
        label: code.display,
      })),
    [],
  )

  return (
    <Flex direction="column" width="30%">
      <BlockLabel name="Severity">Severity</BlockLabel>
      <SelectInput
        field={`allergies.${index}.severityCode`}
        options={options}
        className="w-full"
        buttonClassName="flex-1"
      />
      <FormFieldError name={`allergies.${index}.severityCode`} />
    </Flex>
  )
}

export { SeverityField }
