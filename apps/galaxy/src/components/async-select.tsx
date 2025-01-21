'use client'

import { useEffect, useState } from 'react'
import { Box, Tooltip } from '@radix-ui/themes'
import { type ActionResult } from '@/api'
import { SelectInput } from './select-input'

interface Option {
  label: string
  value: string
}

interface AsyncSelectProps
  extends Omit<React.ComponentProps<typeof SelectInput>, 'options'> {
  fetchOptions: () => Promise<ActionResult<Option[]>>
}

const AsyncSelect = ({ fetchOptions, ...selectProps }: AsyncSelectProps) => {
  const [options, setOptions] = useState<Option[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchOptions()
      .then((result) => {
        if (result.state === 'success') {
          setOptions(result.data)
        } else {
          setError(result.error)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [fetchOptions])

  const content = (
    <Box width="100%">
      <SelectInput
        options={options}
        disabled={loading || error !== null}
        loading={loading}
        {...selectProps}
      />
    </Box>
  )

  if (error) {
    return <Tooltip content={error}>{content}</Tooltip>
  }
  return content
}

export { AsyncSelect }
