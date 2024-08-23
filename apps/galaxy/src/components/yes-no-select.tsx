import { RadioSelectSection } from './radio-select-section'

interface YesNoSelectProps {
  label?: string
  description?: React.ReactNode
  field: string
}

const YesNoSelect = ({ label, description, field }: YesNoSelectProps) => {
  return (
    <RadioSelectSection
      label={label}
      description={description}
      field={field}
      options={[
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ]}
    />
  )
}

export { YesNoSelect }
