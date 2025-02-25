'use client'

import { useEffect, useRef, useState } from 'react'
import { Box, BoxProps } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import { cn, decodeHtmlToText, encodeTextToHtml } from '@/utils'

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
  spellCheck = true,
  className,
  resize = 'both',
  disabled,
  maxLength = 4000,
  autoFocus,
  placeholder,
  ...props
}: AutoResizeInputProps) => {
  const form = useFormContext()
  const errors = form.formState.errors
  const ref = useRef<HTMLDivElement>(null)
  const value = form.watch(field)
  const [isEmpty, setIsEmpty] = useState(!value)

  const handleChange = useDebouncedCallback(() => {
    if (ref.current && !disabled) {
      const { innerHTML } = ref.current
      const contentHTML = decodeHtmlToText(innerHTML)
      if (maxLength && contentHTML && contentHTML.length > maxLength) {
        return
      }
      form.setValue(field, contentHTML, { shouldDirty: true })
      if (field in errors) {
        form.trigger(field)
      }
    }
  }, 300)

  useEffect(() => {
    if (!ref.current) return

    const formattedValue = encodeTextToHtml(value ?? '')
    if (
      (!ref.current.innerHTML && formattedValue) ||
      (ref.current.innerHTML && !formattedValue)
    ) {
      ref.current.innerHTML = formattedValue
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
      onBeforeInput={(e) => {
        const contentLength = decodeHtmlToText(
          e.currentTarget?.innerHTML,
        )?.length
        if (maxLength && contentLength && contentLength >= maxLength) {
          e.preventDefault()
        }
      }}
      onPaste={(e) => {
        if (!maxLength || !ref.current) return
        e.preventDefault()
        const sel = window.getSelection()
        const pastedText = e.clipboardData.getData('text/plain')
        const existingText = e.currentTarget.textContent ?? ''
        const selectedText = sel?.toString() ?? ''
        const maxInsert =
          maxLength - (existingText.length - selectedText.length)
        if (maxInsert <= 0) return
        const text = pastedText.slice(0, maxInsert)
        document.execCommand('insertText', false, text)
      }}
      onInput={(e) => {
        handleChange()
        setIsEmpty(!e.currentTarget?.textContent?.length)
      }}
      onBlur={handleChange}
      contentEditable
      spellCheck={spellCheck}
      suppressContentEditableWarning
      suppressHydrationWarning
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
