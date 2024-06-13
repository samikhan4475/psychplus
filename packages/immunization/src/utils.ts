import { Code, Codeset, OptionType, RealCodeSet } from '@psychplus/immunization'

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

const formatDateTime = (problemDate: string, problemTime: string): string => {
  const combinedDateTime = `${problemDate}T${problemTime}:00`
  const problemDateTime = new Date(combinedDateTime)
  const formattedProblemDateTime = problemDateTime.toISOString()
  return formattedProblemDateTime
}

const toggleGroupItemClasses =
  'font-bold text-3 data-[state=on]:bg-[#dce8ff] data-[state=on]:font-regular'

export { findOptions, findName, formatDateTime, toggleGroupItemClasses }
