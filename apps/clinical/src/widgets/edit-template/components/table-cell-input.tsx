import { useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'

interface InputProps {
  className?: string
  placeholder?: string
  name: string
}

const TableCellInput = (props: InputProps) => {
  const form = useFormContext()
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    form.register(props.name)
    if (inputRef?.current) {
      inputRef.current.value = form.getValues(props.name)
    }
  }, [form, props.name])

  return (
    <input
      className={`${props.className ?? ''} outline-none`}
      placeholder={props.placeholder ?? ''}
      name={props.name}
      ref={inputRef}
      onChange={(e) => form.setValue(props.name, e.target.value)}
    />
  )
}

export { TableCellInput as CellInput }
