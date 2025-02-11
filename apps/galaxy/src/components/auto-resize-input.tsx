'use client'

import { useEffect, useRef, useState } from 'react'
import { Box, BoxProps } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import { cn } from '@/utils'

type AutoResizeInputProps = Omit<
  BoxProps,
  'contentEditable' | 'suppressContentEditableWarning'
> & {
  field: string
  disabled?: boolean
  maxLength?: number
  placeholder?: string
  resize?: 'horizontal' | 'both'
}

const AutoResizeInput = ({
  field,
  spellCheck = false,
  className,
  resize = 'both',
  disabled,
  maxLength,
  autoFocus,
  placeholder,
  ...props
}: AutoResizeInputProps) => {
  const form = useFormContext()
  const ref = useRef<HTMLDivElement>(null)
  const value = form.watch(field)
  const [isEmpty, setIsEmpty] = useState(value ? false : true)

  const handleChange = useDebouncedCallback(() => {
    if (ref.current && !disabled) {
      const contentLength = ref.current?.textContent?.length
      if (maxLength && contentLength && contentLength <= maxLength) {
        return
      }
      form.setValue(field, ref.current.textContent ?? '', {
        shouldValidate: true,
      })
    }
  }, 300)

  useEffect(() => {
    if (!ref.current) return
    if (
      (!ref.current?.textContent && value) ||
      (ref.current?.textContent && !value)
    ) {
      ref.current.textContent = value
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, ref.current])

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus()
    }
  }, [autoFocus])
  return (
    <Box
      ref={ref}
      onInput={(e) => {
        handleChange()
        setIsEmpty(e.currentTarget?.textContent?.length ? false : true)
      }}
      onBlur={handleChange}
      contentEditable
      spellCheck={spellCheck}
      suppressContentEditableWarning
      className={cn(
        'border-pp-gray-8 focus:border-pp-gray-8 min-w-48 bg-white relative max-h-48 max-w-2xl self-start overflow-y-auto overflow-x-hidden rounded-1 border border-solid px-1 py-[1px] text-1 outline-offset-1 outline-accent-8 focus:outline-2 [&::-webkit-scrollbar-thumb]:rounded-2 [&::-webkit-scrollbar-thumb]:bg-grayA-8 [&::-webkit-scrollbar-track]:rounded-2 [&::-webkit-scrollbar-track]:bg-grayA-3 [&::-webkit-scrollbar]:[width:6px]',
        {
          'before:text-nowrap before:absolute before:inset-0 before:overflow-hidden before:px-1 before:py-[1px] before:text-gray-8 before:content-[attr(data-placeholder)]':
            placeholder,
          'before:hidden': !isEmpty,
          'whitespace-nowrap': resize === 'horizontal',
          'cursor-not-allowed bg-gray-6 text-gray-8': disabled,
        },
        className,
      )}
      data-placeholder={placeholder}
      {...props}
    />
  )
}

export { AutoResizeInput }
