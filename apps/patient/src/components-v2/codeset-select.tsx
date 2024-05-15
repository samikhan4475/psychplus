'use client'

import { cn } from '@psychplus-v2/utils'
import { Select } from '@radix-ui/themes'
import { useCodesetCodes } from '@/providers'

interface CodesetSelectProps extends React.ComponentProps<typeof Select.Root> {
  codeset: string
  exclude?: string[]
  placeholder?: string
  onChange: (value: string) => void
  className?: string
}

const CodesetSelect = ({
  codeset,
  exclude,
  placeholder,
  onChange,
  className,
  ...rest
}: CodesetSelectProps) => {
  const codes = useCodesetCodes(codeset)

  const items = codes
    .filter((code) => !exclude?.includes(code.value))
    .map((code) => (
      <Select.Item key={code.value} value={code.value}>
        {code.display}
      </Select.Item>
    ))

  return (
    <Select.Root onValueChange={onChange} {...rest}>
      <Select.Trigger
        placeholder={placeholder ?? 'Select'}
        className={cn(className)}
      />
      <Select.Content position="popper" align="center" highContrast>
        {items}
      </Select.Content>
    </Select.Root>
  )
}

export { CodesetSelect }
