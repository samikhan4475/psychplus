const getSelectedOptions = (
  options: { label: string; value: string }[],
  selectedValues: string[],
): string => {
  // Explicitly specify return type as string
  return options
    .filter((option) => selectedValues.includes(option.value))
    .map((option) => option.label)
    .join(', ')
}
export { getSelectedOptions }
