interface FileFailure {
  line: number
  message: string
}

interface ImportSummary {
  added: number
  updated: number
  totalFound: number
  successful: number
  skipped: number
  failed: number
}
interface ResponseCounts {
  successCount: number
  failedCount: number
  totalCount: number
}
interface ParsedResponse {
  failures: FileFailure[]
  summary: ImportSummary
  counts?: ResponseCounts
}
const parseMasterFeeScheduleLogs = (
  logs: string[],
  counts: ResponseCounts,
): ParsedResponse => {
  const failures: FileFailure[] = []
  let added = 0
  let updated = 0
  const totalFound = counts?.totalCount ?? 0
  const successful = counts?.successCount ?? 0
  const failed = counts?.failedCount ?? 0
  const skipped = 0

  logs.forEach((line) => {
    const errorMatch = line.match(
      /\[MasterFeeScheduleImportError\] Line (\d+): (.+)/,
    )
    if (errorMatch) {
      failures.push({
        line: Number(errorMatch[1]),
        message: errorMatch[2].trim(),
      })
    }
    const addedMatch = line.match(
      /\[MasterFeeScheduleImportSummary\] Records Added: (\d+)/,
    )
    if (addedMatch) added = Number(addedMatch[1])

    const updatedMatch = line.match(
      /\[MasterFeeScheduleImportSummary\] Records Updated: (\d+)/,
    )
    if (updatedMatch) updated = Number(updatedMatch[1])
  })

  return {
    failures,
    summary: {
      added,
      updated,
      totalFound,
      successful,
      skipped,
      failed,
    },
  }
}

export { parseMasterFeeScheduleLogs, type ParsedResponse }
