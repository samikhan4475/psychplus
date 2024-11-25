const formatValue = (value: string): string => {
  const trimmedValue = value.replace(/^[a-z]+/, '')
  const specialCases: Record<string, string> = {
    NoSlowAgitations: 'No slow/agitations',
    BadOrder: 'Bad order',
    MoodCongruent: 'Mood-congruent',
    MoodIncongruent: 'Mood-incongruent',
    RegularRateRhythm: 'Regular rate/rhythm',
    YesterdayEvents: "Yesterday's events",
    UnDisclosed: 'UnDisclosed',
  }

  if (specialCases[trimmedValue]) {
    return specialCases[trimmedValue]
  }

  const formattedValue = trimmedValue
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')

  return (
    formattedValue.charAt(0).toUpperCase() +
    formattedValue.slice(1).toLowerCase()
  )
}

const renderDataWithOther = (
  key: string,
  values: string[],
  data: Record<string, string | string[]>,
): string | null => {
  if (!values || values.length === 0) return null

  const formattedValues: string[] = []
  let otherDetail = ''

  values.forEach((value) => {
    const cleanedValue = formatValue(value)
    const regex = /^([a-z]+)([A-Z].*)$/
    const match = regex.exec(value) || []
    const [, prefix] = match

    const otherDetailText = data[`${prefix}OtherDetails`] as string

    if (cleanedValue === 'Other' && otherDetailText) {
      otherDetail = `Other: ${otherDetailText}`
    } else {
      formattedValues.push(cleanedValue)
    }

    if (value === 'siUnDisclosed' || value === 'hiUnDisclosed') {
      otherDetail = `Other: ${otherDetailText}`
    }
  })

  if (otherDetail) {
    formattedValues.push(otherDetail)
  }

  return formattedValues.join(', ')
}

export { formatValue, renderDataWithOther }
