import { HospitalInitialFieldMapping } from '@/ui/hospital/hospital-initial-widget/constants'

function sortByMapping(prefix: string, data: string[]) {
  const filteredMapping = HospitalInitialFieldMapping.filter((mapping) =>
    mapping.value.startsWith(prefix),
  )

  const mappingOrder = new Map(
    filteredMapping.map((mapping, index) => [mapping.label, index]),
  )

  return data.slice().sort((a, b) => {
    const indexA = mappingOrder.get(a) ?? Number.MAX_VALUE
    const indexB = mappingOrder.get(b) ?? Number.MAX_VALUE
    return indexA - indexB
  })
}

export { sortByMapping }
