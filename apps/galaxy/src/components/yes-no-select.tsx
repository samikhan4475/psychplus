import { RadioSelectSection } from './radio-select-section'

interface YesNoSelectProps {
  label?: string;
  description?: React.ReactNode;
  field: string;
  options?: { label: string; value: string }[]; 
  required?:boolean
}

const defaultOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

const YesNoSelect = ({ label, description, field,options = defaultOptions, required }: YesNoSelectProps) => {
  return (
    <RadioSelectSection
      label={label}
      description={description}
      field={field}
      options={options}
      required={required}
    />
  )
}

export { YesNoSelect }
