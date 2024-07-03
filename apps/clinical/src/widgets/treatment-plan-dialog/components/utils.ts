import { SnomedCode } from '@psychplus/assessment-and-treatment-plan/types'

const transformSnomedData = (data: SnomedCode[]) => {
  return data.map((item, index) => {
    const { displayName, ...rest } = item
    return {
      ...rest,
      description: displayName, // Update displayName to description
      id: (index + 1).toString(), // Add a new key "id" with the index + 1
    }
  })
}

export { transformSnomedData }
