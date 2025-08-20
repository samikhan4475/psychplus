import { SharedCode } from '@/types'

function mapCodesetToOptions(
  codeset: SharedCode[],
): { label: string; value: string }[] {
  return codeset.map(({ display, ...rest }) => ({
    label: display,
    ...rest,
  }))
}

function mapValuesToLabels(valuesArray: string[], labelMapArray: SharedCode[]) {
  if (!Array.isArray(valuesArray) || !Array.isArray(labelMapArray))
    return valuesArray

  const valueToDisplayMap = Object.fromEntries(
    labelMapArray.map((item) => [item.value, item.display]),
  )

  return valuesArray
    .map((value) => valueToDisplayMap[value] || value)
    ?.toString()
    .split(',')
    .join(', ')
}

function getLabelFromCodeset(value: string, mapping: SharedCode[]) {
  const entry = mapping.find((item) => item.value === value)
  return entry ? entry.display : value
}

const replaceValueWithLabel = (item: string, codeset: SharedCode[]) => {
  const [value] = item.split(' ')
  const label = getLabelFromCodeset(value, codeset)
  return item.replace(value, label)
}

export {
  mapCodesetToOptions,
  mapValuesToLabels,
  replaceValueWithLabel,
  getLabelFromCodeset,
}
