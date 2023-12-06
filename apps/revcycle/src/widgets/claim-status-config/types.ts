interface ClaimStatus {
  id: string
  name: string
  dueTo: string
  createdBy: string
  isActive: boolean
}

interface ClaimDueTo {
  value: string
  label: string
}

type ClaimStatusDiff = Partial<ClaimStatus> & { id: string }

type ClaimStatusDiffs = { [key: string]: ClaimStatusDiff | undefined }

export type { ClaimStatus, ClaimStatusDiff, ClaimStatusDiffs, ClaimDueTo }
