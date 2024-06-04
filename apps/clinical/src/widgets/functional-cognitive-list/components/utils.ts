import {
  Code,
  Codeset,
  FunctionalCognitive,
  OptionType,
  RealCodeSet,
} from '@psychplus/functional-cognitive'

const findOptions = (codeSystemName: string, codeSets: RealCodeSet) => {
  const fundingCodeSets = codeSets?.codesets?.find(
    (codeSet: Codeset) => codeSet.codeSystemName === codeSystemName,
  )

  const options = fundingCodeSets
    ? fundingCodeSets.codes.map((codeSet: Code) => ({
        label: codeSet.displayName,
        value: codeSet.code,
      }))
    : []
  return options
}

const findName = (
  codeSystemName: string,
  codeSets: RealCodeSet,
  code: string | null | undefined,
) => {
  if (code) {
    const options: OptionType[] = findOptions(codeSystemName, codeSets)

    const option = options.find((option: OptionType) => option.value === code)

    return option?.label
  }
  return ''
}

const flattenFunctionalCognitive = (
  functionalcognitives: (FunctionalCognitive | FunctionalCognitive[])[],
) => {
  return functionalcognitives.flatMap((functionalcognitive) =>
    Array.isArray(functionalcognitive)
      ? functionalcognitive
      : [functionalcognitive],
  )
}

const formatDateTime = (problemDate: string, problemTime: string): string => {
  const combinedDateTime = `${problemDate}T${problemTime}:00`
  const problemDateTime = new Date(combinedDateTime)
  const formattedProblemDateTime = problemDateTime.toISOString()
  return formattedProblemDateTime
}

const TIMES: OptionType[] = []
for (let i = 0; i < 24; i++) {
  const hour = i < 10 ? `0${i}` : `${i}`
  TIMES.push({ value: `${hour}:00`, label: `${hour}:00` })
}

export const requestBody = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeMetadataPermissions: true,
  isIncludeCodesets: true,
  isIncludeCodes: true,
  isIncludeCodeAttributes: true,
  namespace: 'CDC',
  recordStatuses: ['Active'],
}

export {
  findOptions,
  findName,
  flattenFunctionalCognitive,
  formatDateTime,
  TIMES,
}
