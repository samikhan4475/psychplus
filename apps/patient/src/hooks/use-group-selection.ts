import { useFormContext } from 'react-hook-form'

interface UseGroupSelectionProps {
  fieldName: string
  targetValue: string
}

const useGroupSelection = ({ fieldName, targetValue }: UseGroupSelectionProps) => {
  const form = useFormContext()
  const selectedValues = form.getValues(fieldName) as string[]

  const handleOptionSelect = (selectedOption: string) => {
    if (selectedOption === targetValue) {
      if (selectedValues.length === 1 && selectedValues[0] === targetValue) {
        form.setValue(fieldName, [])
      } else {
        form.setValue(fieldName, [targetValue])
      }
      return
    }

    if (selectedValues.includes(targetValue)) {
      const updatedValues = selectedValues.filter(
        (option: string) => option !== targetValue,
      )
      form.setValue(fieldName, [...updatedValues, selectedOption])
    } else if (selectedValues.includes(selectedOption)) {
      const updatedValues = selectedValues.filter(
        (option: string) => option !== selectedOption,
      )
      form.setValue(fieldName, updatedValues)
    } else {
      form.setValue(fieldName, [...selectedValues, selectedOption])
    }
  }

  return { handleOptionSelect }
}

export { useGroupSelection }
