'use client'

import { useEffect, useState } from 'react'
import { Box, Tooltip } from '@radix-ui/themes'
import { type ActionResult } from '@/api'
import { DropdownSelect } from './dropdown-select'

interface Option {
  label: string
  value: string
}

interface AsyncDropdownProps
  extends Omit<React.ComponentProps<typeof DropdownSelect>, 'options'> {
  fetchOptions: () => Promise<ActionResult<Option[]>>
}

const AsyncDropdownSelect = ({ fetchOptions, ...dropdownProps }: AsyncDropdownProps) => {
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
      <DropdownSelect
        options={options}
        disabled={loading || error !== null}
        loading={loading}
        {...dropdownProps}
      />
    </Box>
  )

  if (error) {
    return <Tooltip content={error}>{content}</Tooltip>
  }
  return content
}

export { AsyncDropdownSelect }
