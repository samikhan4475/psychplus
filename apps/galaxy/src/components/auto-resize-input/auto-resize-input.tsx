'use client'

import { useEffect, useRef, useState } from 'react'
import { Box, BoxProps, Popover } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn, decodeHtmlToText, encodeTextToHtml } from '@/utils'
import { useAutoTextSuggestions } from './hooks'
import { SuggestionsContainer } from './suggestions-container'
import { handleBeforeInput, handlePaste } from './utils'

type AutoResizeInputProps = Omit<BoxProps, 'contentEditable'> & {
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
  autoFocus = false,
  placeholder,
  ...props
}: AutoResizeInputProps) => {
  const form = useFormContext()
  const errors = form.formState.errors
  const ref = useRef<HTMLDivElement>(null)
  const value = form.watch(field)
  const [isEmpty, setIsEmpty] = useState(!value)
  const [focused, setFocused] = useState(autoFocus)

  const handleChange = () => {
    if (!ref.current || disabled) return
    const contentHTML = decodeHtmlToText(ref.current.innerHTML)
    if (maxLength && contentHTML && contentHTML.length > maxLength) return
    form.setValue(field, contentHTML, { shouldDirty: true })
    if (field in errors) form.trigger(field)
  }

  const {
    handleInsetSuggestion,
    handleTrackSuggestions,
    loading,
    showSuggestions,
    suggestions,
    offset,
    ...rest
  } = useAutoTextSuggestions(ref)

  useEffect(() => {
    if (!ref.current) return
    const currentHTML = decodeHtmlToText(ref.current.innerHTML)
    if (currentHTML !== value) {
      ref.current.innerHTML = encodeTextToHtml(value ?? '')
    }
  }, [value])

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus()
    }
  }, [autoFocus])
  return (
    <SuggestionsContainer
      showSuggestions={showSuggestions}
      offset={offset}
      loading={loading}
      suggestions={suggestions}
      handleInsetSuggestion={(value) =>
        handleInsetSuggestion(value, handleChange)
      }
      focused={focused}
      {...rest}
    >
      <Popover.Trigger>
        <Box
          ref={ref}
          contentEditable
          spellCheck={spellCheck}
          suppressContentEditableWarning
          suppressHydrationWarning
          data-placeholder={placeholder}
          onBeforeInput={handleBeforeInput(maxLength)}
          onPaste={handlePaste(ref.current, maxLength)}
          onInput={(e) => {
            handleChange()
            handleTrackSuggestions()
            setIsEmpty(!e.currentTarget?.textContent?.length)
          }}
          onKeyDown={(e) => {
            if (
              e.key === 'Enter' &&
              !loading &&
              showSuggestions &&
              suggestions.length
            ) {
              e.preventDefault()
              handleInsetSuggestion(suggestions[0].value, handleChange)
            }
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            handleChange()
            setFocused(false)
          }}
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
          {...props}
        />
      </Popover.Trigger>
    </SuggestionsContainer>
  )
}

export { AutoResizeInput }
