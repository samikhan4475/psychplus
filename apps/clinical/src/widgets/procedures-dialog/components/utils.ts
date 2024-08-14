import { SnomedCode } from '@psychplus/codeset'
import { TcpTypeEnum } from '@psychplus/procedures'

const transformSnomedData = (data: SnomedCode[]) => {
  return data.map((item, index) => {
    const { displayName, ...rest } = item
    return {
      ...rest,
      description: displayName,
      id: (index + 1).toString(),
    }
  })
}

const filterModifierData = (data: SnomedCode[]) => {
  return data.filter((item) => item.groupingCode !== TcpTypeEnum.Modifier)
}

export { transformSnomedData, filterModifierData }
