interface ClaimStatus {
  id: string
  name: string
  dueTo: string
  createdBy: string
  isActive: boolean
}

type ClaimStatusDiff = Partial<ClaimStatus> & { id: string }

type ClaimStatusDiffs = { [key: string]: ClaimStatusDiff | undefined }

export type { ClaimStatus, ClaimStatusDiff, ClaimStatusDiffs }
