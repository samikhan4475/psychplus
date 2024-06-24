import { format, getUnixTime, parse } from 'date-fns'
import {
  Code,
  Codeset,
  OptionType,
  Problem,
  RealCodeSet,
} from '@psychplus/problems'

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

const flattenProblems = (problems: (Problem | Problem[])[]) => {
  return problems.flatMap((problem) =>
    Array.isArray(problem) ? problem : [problem],
  )
}

const formatDateTime = (problemDate: string, problemTime: string): string => {
  const [hour, minute, ampm] = problemTime.split(/[: ]/) // Split into hour, minute, and AM/PM

  let hour24 = parseInt(hour, 10)
  if (ampm === 'PM' && hour24 !== 12) {
    hour24 += 12
  } else if (ampm === 'AM' && hour24 === 12) {
    hour24 = 0
  }

  const combinedDateTime = `${problemDate}T${hour24
    .toString()
    .padStart(2, '0')}:${minute}:00`

  const problemDateTime = parse(
    combinedDateTime,
    "yyyy-MM-dd'T'HH:mm:ss",
    new Date(),
  )

  // Directly convert to ISO string with 'Z' for UTC
  const formattedProblemDateTime = format(
    getUnixTime(problemDateTime) * 1000,
    "yyyy-MM-dd'T'HH:mm:ss'Z'",
  )

  return formattedProblemDateTime
}

const TIMES: OptionType[] = []

for (let i = 0; i < 24; i++) {
  const hour = i % 12 || 12 // Convert to 12-hour format (12 instead of 0)
  const minute = '00'
  const ampm = i < 12 ? 'AM' : 'PM'
  TIMES.push({
    value: `${hour.toString().padStart(2, '0')}:${minute} ${ampm}`,
    label: `${hour.toString().padStart(2, '0')}:${minute} ${ampm}`,
  })
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

export { findOptions, findName, flattenProblems, formatDateTime, TIMES }
