'use client'

import { useMemo, useRef } from 'react'
import { Box, BoxProps } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import { cn } from '@/utils'

type AutoResizeInputProps = Omit<
  BoxProps,
  'contentEditable' | 'suppressContentEditableWarning'
> & {
  field: string
  resize?: 'horizontal' | 'both'
}

const AutoResizeInput = ({
  field,
  spellCheck = false,
  className,
  resize = 'both',
  ...props
}: AutoResizeInputProps) => {
  const form = useFormContext()
  const ref = useRef<HTMLDivElement>(null)
  const value = form.watch(field)

  const handleChange = useDebouncedCallback(() => {
    if (ref.current) {
      form.setValue(field, ref.current.textContent ?? '', {
        shouldValidate: true,
      })
    }
  }, 300)

  useMemo(() => {
    if (ref.current) {
      if (!ref.current?.textContent && value) {
        ref.current.textContent = value
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, ref.current])

  return (
    <Box
      ref={ref}
      onInput={handleChange}
      onBlur={handleChange}
      contentEditable
      spellCheck={spellCheck}
      suppressContentEditableWarning
      className={cn(
        'border-pp-gray-8 min-w-48 max-h-52 max-w-2xl overflow-y-auto overflow-x-hidden rounded-1 border border-solid px-1 py-[1px] text-1 outline-offset-1 outline-accent-8 focus:outline-2',
        {
          'whitespace-nowrap': resize === 'horizontal',
        },
        className,
      )}
      {...props}
    />
  )
}

export { AutoResizeInput }
