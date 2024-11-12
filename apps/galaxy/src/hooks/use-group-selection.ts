import { useFormContext } from 'react-hook-form'

interface UseGroupSelectionProps {
  key: string
  value: string
}

const useGroupSelection = ({ key, value }: UseGroupSelectionProps) => {
  const form = useFormContext()
  const selectedOptions = form.getValues(key) as string[]

  const handleOptionSelect = (selectedValue: string) => {
    if (selectedValue === value) {
      if (selectedOptions.length === 1 && selectedOptions[0] === value) {
        form.setValue(key, [])
      } else {
        form.setValue(key, [value])
      }
      return
    }

    if (selectedOptions.includes(value)) {
      const updatedOptions = selectedOptions.filter(
        (option: string) => option !== value,
      )
      form.setValue(key, [...updatedOptions, selectedValue])
    } else if (selectedOptions.includes(selectedValue)) {
      const updatedOptions = selectedOptions.filter(
        (option: string) => option !== selectedValue,
      )
      form.setValue(key, updatedOptions)
    } else {
      form.setValue(key, [...selectedOptions, selectedValue])
    }
  }

  return { handleOptionSelect }
}

export { useGroupSelection }
