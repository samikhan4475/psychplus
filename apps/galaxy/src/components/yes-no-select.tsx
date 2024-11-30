import { RadioSelectSection } from './radio-select-section'

interface YesNoSelectProps {
  label?: string
  description?: React.ReactNode
  field: string
  options?: { label: string; value: string }[]
  required?: boolean
  className?: string
  isNoFirst?: boolean
  disabled?: boolean
  defaultValue?: string
  onChange?: (value: string) => void
  lastOptionIndicator?:boolean
  resetOnSameValue?: boolean
}

const defaultOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

const reversDefault = [
  { label: 'No', value: 'no' },
  { label: 'Yes', value: 'yes' },
]

const YesNoSelect = ({
  label,
  description,
  field,
  options = defaultOptions,
  required,
  className,
  isNoFirst,
  disabled = false,
  defaultValue,
  onChange,
  lastOptionIndicator = false,
  resetOnSameValue,

}: YesNoSelectProps) => {
  if (isNoFirst) {
    options = reversDefault
  }
  return (
    <RadioSelectSection
      label={label}
      description={description}
      field={field}
      options={options}
      required={required}
      className={className}
      disabled={disabled}
      defaultValue={defaultValue}
      onChange={onChange}
      lastOptionIndicator={lastOptionIndicator}
      resetOnSameValue={resetOnSameValue}
    />
  )
}

export { YesNoSelect }
