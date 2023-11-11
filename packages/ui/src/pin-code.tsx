import React, { useRef, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { NativeInputEvent, PropsWithTestId } from './types'

interface PinCodeProps extends PropsWithTestId {
  autoFocus?: boolean
  isPassword?: boolean
  pinLength?: number
  onChange: (value: string) => void
}

const PinCode = ({
  autoFocus,
  isPassword,
  pinLength = 4,
  'data-testid': dataTestId,
}: PinCodeProps) => {
  const wrapperRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState(new Array<string>(pinLength).fill(''))

  const setFocus = (index: number) => {
    const inputEl = wrapperRef.current?.childNodes[index] as
      | HTMLInputElement
      | undefined

    if (inputEl) {
      inputEl.focus()
    }
  }

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const nativeEvent = e.nativeEvent as unknown as NativeInputEvent

    if (nativeEvent.inputType !== 'insertText') {
      return
    }

    value[index] = nativeEvent.data
    setValue(value.slice())
    setFocus(index + 1)
  }

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    e.preventDefault()

    const pastedData = e.clipboardData.getData('text/plain')

    if (/^\d+$/.test(pastedData)) {
      const newCode = pastedData.split('')

      for (let i = 0; i < newCode.length; i++) {
        if (index + i < value.length) {
          value[index + i] = newCode[i]
        }
      }

      setValue([...value])
      setFocus(value.length - 1)
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { key } = e

    if (key === 'ArrowRight') {
      setFocus(index + 1)
    } else if (key === 'ArrowLeft') {
      setFocus(index - 1)
    } else if (key === 'Backspace') {
      value[index] = ''
      setValue(value.slice())
      setFocus(index - 1)
    }
  }

  return (
    <Flex ref={wrapperRef} gap="2" data-testid={dataTestId}>
      {value.map((c, i) => (
        <input
          key={`pincode-${i}`}
          type="number"
          value={c && isPassword ? '•' : c}
          autoFocus={i === 0 && autoFocus}
          onChange={(e) => handleOnChange(e, i)}
          onPaste={(e) => handlePaste(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="h-10 w-10 rounded-1 border-2 border-transparent bg-accent-4 text-center text-accent-9 outline-none focus:border-accent-9"
        />
      ))}
    </Flex>
  )
}

export { PinCode }
