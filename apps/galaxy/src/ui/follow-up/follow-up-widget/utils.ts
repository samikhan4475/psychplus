import { NEXT_OPTIONS } from './constants'

const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj)
      .flatMap(([key, value]) => {
        if (
          Array.isArray(value) &&
          (value.length === 0 || value.every((v) => v === ''))
        ) {
          return []
        }
        return [[key, value]]
      })
      .filter(([_, value]) => value !== null && value !== ''),
  )
}

const getEndDate = (selectedValue: string) => {
  const today = new Date()
  const endDate = new Date(today)

  const valueMap: Record<string, number> = {
    day: 1,
    days: 1,
    week: 7,
    weeks: 7,
  }

  const selectedOption = NEXT_OPTIONS.find(
    (option) => option.value === selectedValue,
  )

  if (selectedOption) {
    let amountStr = ''
    let unit = ''

    for (const char of selectedValue) {
      if (!isNaN(Number(char))) {
        amountStr += char
      } else {
        unit += char
      }
    }

    const amount = Number(amountStr)

    if (amount && unit in valueMap) {
      const daysToAdd = amount * valueMap[unit as keyof typeof valueMap]
      endDate.setDate(today.getDate() + daysToAdd)
    }
  }

  return endDate
}

export { removeEmptyValues, getEndDate }
