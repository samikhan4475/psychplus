import { SnomedCode } from '@psychplus/assessment-and-treatment-plan/types'

const transformSnomedData = (data: SnomedCode[]) => {
  const transformedData = data
    .map((item, index) => ({
      ...item,
      description: item.displayName, // Update displayName to description
      id: (index + 1).toString(), // Add a new key "id" with the index + 1
    }))
    .map(({ displayName, ...item }) => item) // Remove displayName from each object

  return transformedData
}

export { transformSnomedData }
